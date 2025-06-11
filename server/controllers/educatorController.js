import { clerkClient } from '@clerk/express'
import Course from '../models/Course.js'
import {v2 as cloudinary} from 'cloudinary'
import { Purchase } from '../models/Purchase.js'
import User from '../models/User.js'

// update role to educator
export const updateRoleToEducator = async (req, res) => {
    try {
        const userId = req.auth.userId

        await clerkClient.users.updateUserMetadata(userId, {
            publicMetadata:{
                role: 'educator',
            }
        })

        res.json({ success: true, message: 'You can publish a course now'})
    } catch (error) {
        res.json({ success: false, message: error.message})
    }
}

// Add new course
export const addCourse = async ( req, res) => {
    try {
        const {courseData} = req.body
        const imageFile = req.file
        const educatorId = req.auth.userId

        if (!imageFile) {
            return res.json({success: false, message: 'Thumbnail Not Attached'})
        }

        const parsedCourseData = await JSON.parse(courseData)
        parsedCourseData.educator = educatorId
        const newCourse =  await Course.create(parsedCourseData)
        const imageUpload = await cloudinary.uploader.upload(imageFile.path)
        newCourse.courseThumbnail = imageUpload.secure_url
        await newCourse.save()

        res.json({success: true, message:'Course Added'})
        
    } catch (error) {
        res.json({success: false, message: error.message})
        
    }
}

// Get Educator Course
export const getEducatorCourse = async (req, res) => {
    try {
        const educator = req.auth.userId
        const courses = await Course.find({educator})
        res.json({success: true, courses})
    } catch (error) {
        res.json({ success: false, message: error.message})
    }
}

// Get Educator Dashboard data (Total Earning, Enrolled Students, No. of course)

export const educatorDashboardData = async (req, res)=> {
    try {
        const educator = req.auth.userId;
        const courses = await Course.find({educator});
        const totalCourses = courses.length;

        const courseIds = courses.map(course => course._id);
        //Calculate total earnings from purchases
        const purchases = await Purchase.find({
            courseId: {$in: courseIds},
            status: 'completed'
        });

        const totalEarnings = purchases.reduce((sum, purchase)=> sum + purchase.amount, 0);

        //Collect unique enrolled student IDs with their course titles

        const enrolledStudentsData = [];
        for(const course of courses) {
            const students = await User.find({
                _id: {$in: course.enrolledStudents}
            }, 'name imageUrl');

            students.forEach(student => {
                enrolledStudentsData.push({
                    courseTitle: course.courseTitle,
                    student
                });
            });
        }

        res.json({success: true, dashboardData: {
            totalEarnings, enrolledStudentsData, totalCourses
        }})
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

// Get Enrolled Students Data with Purchase Data

export const getEnrolledStudentsData = async (req, res)=> {
    try {
        const educator = req.auth.userId;
        const courses = await Course.find({educator});
        const courseIds = courses.map(course => course._id);
        
        const purchases = await Purchase.find ({
            courseId: {$in: courseIds},
            status: 'completed'
        }).populate('userId', 'name imageUrl').populate('courseId', 'courseTitle')

        const enrolledStudents = purchases.map(purchase => ({
            student: purchase.userId,
            courseTitle: purchase.courseId.courseTitle,
            purchaseData: purchase.createdAt
        }));

        res.json({success: true, enrolledStudents})
        } catch (error) {
            res.json({success: false, message: error.message})
        }
    }
    // chinh sua
    export const getCourseById = async (req, res) => {
        try {
            const course = await Course.findById(req.params.id)
            if (!course) {
            return res.status(404).json({ success: false, message: 'Course not found' })
            }
            if (course.educator.toString() !== req.auth.userId) {
            return res.status(403).json({ success: false, message: 'Not authorized' })
            }
            res.json({ success: true, course })
        } catch (error) {
            res.status(500).json({ success: false, message: error.message })
        }
    }


    export const updateCourse = async (req, res) => {
        try {
            const course = await Course.findById(req.params.id);
            if (!course)
            return res.status(404).json({ success: false, message: "Course not found" });

            if (course.educator.toString() !== req.auth.userId)
            return res.status(403).json({ success: false, message: "Not authorized" });

            const { courseData } = req.body;
            const parsedData = JSON.parse(courseData);

            course.courseTitle = parsedData.courseTitle;
            course.courseDescription = parsedData.courseDescription;
            course.coursePrice = parsedData.coursePrice;
            course.discount = parsedData.discount;
            course.courseContent = parsedData.courseContent;

            // Nếu có ảnh mới, upload lên Cloudinary
            if (req.file) {
            const imageUpload = await cloudinary.uploader.upload(req.file.path);
            course.courseThumbnail = imageUpload.secure_url;
            }

            await course.save();

            res.json({ success: true, message: "Course Updated", course });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    };



    // xoa khoa hoc
    export const deleteCourse = async (req, res) => {
    try {
        const courseId = req.params.id;
        const educatorId = req.auth.userId;

        const course = await Course.findOne({ _id: courseId, educator: educatorId });
        if (!course) {
        return res.status(404).json({ success: false, message: 'Course not found' });
        }

        await course.deleteOne();

        res.json({ success: true, message: 'Course deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
    };

