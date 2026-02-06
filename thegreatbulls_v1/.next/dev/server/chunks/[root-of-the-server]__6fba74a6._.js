module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[project]/Documents/Projects/thegreatbulls-react/thegreatbulls_v1/src/lib/prisma.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "prisma",
    ()=>prisma
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$2c$__$5b$project$5d2f$Documents$2f$Projects$2f$thegreatbulls$2d$react$2f$thegreatbulls_v1$2f$node_modules$2f40$prisma$2f$client$29$__ = __turbopack_context__.i("[externals]/@prisma/client [external] (@prisma/client, cjs, [project]/Documents/Projects/thegreatbulls-react/thegreatbulls_v1/node_modules/@prisma/client)");
;
const globalForPrisma = globalThis;
const prisma = globalForPrisma.prisma ?? new __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$2c$__$5b$project$5d2f$Documents$2f$Projects$2f$thegreatbulls$2d$react$2f$thegreatbulls_v1$2f$node_modules$2f40$prisma$2f$client$29$__["PrismaClient"]();
if ("TURBOPACK compile-time truthy", 1) globalForPrisma.prisma = prisma;
}),
"[project]/Documents/Projects/thegreatbulls-react/thegreatbulls_v1/src/app/api/courses/[id]/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DELETE",
    ()=>DELETE,
    "GET",
    ()=>GET,
    "PUT",
    ()=>PUT
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$thegreatbulls$2d$react$2f$thegreatbulls_v1$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Projects/thegreatbulls-react/thegreatbulls_v1/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$thegreatbulls$2d$react$2f$thegreatbulls_v1$2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/Projects/thegreatbulls-react/thegreatbulls_v1/src/lib/prisma.ts [app-route] (ecmascript)");
;
;
async function GET(request, context) {
    try {
        // Temporarily remove auth check for testing
        // const session = await getServerSession(authOptions)
        // if (!session || session.user.role !== 'admin') {
        //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        // }
        const { id: courseId } = await context.params;
        if (!courseId) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$thegreatbulls$2d$react$2f$thegreatbulls_v1$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Course id is missing'
            }, {
                status: 400
            });
        }
        // Try to find by ID first, then by slug
        let course;
        try {
            course = await __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$thegreatbulls$2d$react$2f$thegreatbulls_v1$2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].course.findUnique({
                where: {
                    id: courseId
                },
                include: {
                    instructor: {
                        select: {
                            id: true,
                            name: true,
                            email: true
                        }
                    },
                    category: {
                        select: {
                            id: true,
                            name: true
                        }
                    },
                    modules: {
                        include: {
                            lessons: true
                        },
                        orderBy: {
                            order: 'asc'
                        }
                    },
                    enrollments: {
                        include: {
                            user: {
                                select: {
                                    id: true,
                                    name: true,
                                    email: true
                                }
                            }
                        }
                    },
                    reviews: {
                        include: {
                            user: {
                                select: {
                                    id: true,
                                    name: true,
                                    email: true
                                }
                            }
                        }
                    },
                    _count: {
                        select: {
                            enrollments: true,
                            reviews: true
                        }
                    }
                }
            });
        } catch (error) {
            // If ID lookup fails (invalid ObjectID), try slug lookup
            course = await __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$thegreatbulls$2d$react$2f$thegreatbulls_v1$2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].course.findFirst({
                where: {
                    slug: courseId
                },
                include: {
                    instructor: {
                        select: {
                            id: true,
                            name: true,
                            email: true
                        }
                    },
                    category: {
                        select: {
                            id: true,
                            name: true
                        }
                    },
                    modules: {
                        include: {
                            lessons: true
                        },
                        orderBy: {
                            order: 'asc'
                        }
                    },
                    enrollments: {
                        include: {
                            user: {
                                select: {
                                    id: true,
                                    name: true,
                                    email: true
                                }
                            }
                        }
                    },
                    reviews: {
                        include: {
                            user: {
                                select: {
                                    id: true,
                                    name: true,
                                    email: true
                                }
                            }
                        }
                    },
                    _count: {
                        select: {
                            enrollments: true,
                            reviews: true
                        }
                    }
                }
            });
        }
        if (!course) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$thegreatbulls$2d$react$2f$thegreatbulls_v1$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Course not found'
            }, {
                status: 404
            });
        }
        // Calculate stats
        const totalStudents = course.enrollments.length;
        const avgRating = course.reviews.length > 0 ? course.reviews.reduce((sum, review)=>sum + review.rating, 0) / course.reviews.length : 0;
        const totalLessons = course.modules.reduce((sum, module)=>sum + module.lessons.length, 0);
        const totalModules = course.modules.length;
        const courseWithStats = {
            ...course,
            courseOverview: course.overview,
            courseTopics: course.courseTopics,
            skillsCovered: course.skillsCovered,
            prerequisites: course.prerequisites,
            requirements: course.requirements,
            whatYouWillLearn: course.whatYouWillLearn,
            learningOutcomes: course.learningOutcomes,
            targetAudience: course.targetAudience,
            stats: {
                totalStudents,
                avgRating: Math.round(avgRating * 10) / 10,
                totalLessons,
                totalModules
            }
        };
        return __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$thegreatbulls$2d$react$2f$thegreatbulls_v1$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(courseWithStats);
    } catch (error) {
        console.error('Error fetching course:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$thegreatbulls$2d$react$2f$thegreatbulls_v1$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Internal server error'
        }, {
            status: 500
        });
    }
}
async function PUT(request, context) {
    try {
        // Temporarily remove auth check for testing
        // const session = await getServerSession(authOptions)
        // if (!session || session.user.role !== 'admin') {
        //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        // }
        const body = await request.json();
        const { title, description, price, category, level, instructorName, instructorBio, thumbnail, duration, language, prerequisites, learningObjectives, tags, status, isPublished, subtitle, shortDescription, requirements, whatYouWillLearn, learningOutcomes, courseOverview, courseTopics, skillsCovered, targetAudience, isFeatured, expiryDate, maxEnrollments, certificateTemplate } = body;
        // Verify course exists
        const { id: courseId } = await context.params;
        if (!courseId) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$thegreatbulls$2d$react$2f$thegreatbulls_v1$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Course id is missing'
            }, {
                status: 400
            });
        }
        const existingCourse = await __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$thegreatbulls$2d$react$2f$thegreatbulls_v1$2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].course.findUnique({
            where: {
                id: courseId
            }
        });
        if (!existingCourse) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$thegreatbulls$2d$react$2f$thegreatbulls_v1$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Course not found'
            }, {
                status: 404
            });
        }
        // Build the update data object - MUST BE DECLARED FIRST
        const updateData = {};
        // Handle instructor update if provided
        if (instructorName !== undefined) {
            if (!instructorName || !instructorName.trim()) {
                return __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$thegreatbulls$2d$react$2f$thegreatbulls_v1$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    error: 'Instructor name cannot be empty'
                }, {
                    status: 400
                });
            }
            // Find or create instructor by email (unique field)
            const instructorEmail = `${instructorName.trim().toLowerCase().replace(/\s+/g, '.')}@instructor.com`;
            const instructor = await __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$thegreatbulls$2d$react$2f$thegreatbulls_v1$2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].user.upsert({
                where: {
                    email: instructorEmail
                },
                update: {
                    name: instructorName.trim(),
                    bio: instructorBio || null
                },
                create: {
                    email: instructorEmail,
                    name: instructorName.trim(),
                    bio: instructorBio || null,
                    password: await bcrypt.hash('password123', 10),
                    role: 'INSTRUCTOR'
                }
            });
            updateData.instructorId = instructor.id;
        }
        if (title !== undefined) updateData.title = title;
        if (subtitle !== undefined) updateData.subtitle = subtitle;
        if (description !== undefined) updateData.description = description;
        if (shortDescription !== undefined) updateData.shortDescription = shortDescription;
        if (price !== undefined) updateData.price = parseFloat(price.toString());
        if (level !== undefined) updateData.level = level;
        if (thumbnail !== undefined) updateData.thumbnail = thumbnail;
        if (duration !== undefined) updateData.duration = parseInt(duration.toString());
        if (language !== undefined) updateData.language = language;
        if (status !== undefined) updateData.status = status;
        if (isPublished !== undefined) updateData.isPublished = isPublished;
        if (isFeatured !== undefined) updateData.isFeatured = isFeatured;
        if (expiryDate !== undefined) updateData.expiryDate = expiryDate ? new Date(expiryDate) : null;
        if (maxEnrollments !== undefined) updateData.maxEnrollments = maxEnrollments ? parseInt(maxEnrollments.toString()) : null;
        if (certificateTemplate !== undefined) updateData.certificateTemplate = certificateTemplate;
        if (prerequisites !== undefined) updateData.prerequisites = prerequisites;
        if (requirements !== undefined) updateData.requirements = requirements;
        if (learningObjectives !== undefined) updateData.whatYouWillLearn = learningObjectives;
        if (whatYouWillLearn !== undefined) updateData.whatYouWillLearn = whatYouWillLearn;
        if (learningOutcomes !== undefined) updateData.learningOutcomes = learningOutcomes;
        if (courseOverview !== undefined) updateData.overview = courseOverview;
        if (courseTopics !== undefined) updateData.courseTopics = courseTopics;
        if (skillsCovered !== undefined) updateData.skillsCovered = skillsCovered;
        if (targetAudience !== undefined) updateData.targetAudience = targetAudience;
        if (tags !== undefined) updateData.keywords = tags;
        // Handle category as a relation (find or create)
        if (category !== undefined && category !== null && category !== '') {
            const existingCategory = await __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$thegreatbulls$2d$react$2f$thegreatbulls_v1$2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].category.findFirst({
                where: {
                    name: category
                }
            });
            if (existingCategory) {
                updateData.categoryId = existingCategory.id;
            } else {
                // Create new category
                const newCategory = await __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$thegreatbulls$2d$react$2f$thegreatbulls_v1$2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].category.create({
                    data: {
                        name: category,
                        slug: category.toLowerCase().replace(/\s+/g, '-')
                    }
                });
                updateData.categoryId = newCategory.id;
            }
        }
        const updatedCourse = await __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$thegreatbulls$2d$react$2f$thegreatbulls_v1$2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].course.update({
            where: {
                id: courseId
            },
            data: updateData,
            include: {
                instructor: {
                    select: {
                        id: true,
                        name: true,
                        email: true
                    }
                },
                category: {
                    select: {
                        id: true,
                        name: true
                    }
                }
            }
        });
        // Log admin action (temporarily disabled)
        // await prisma.adminAction.create({
        //   data: {
        //     adminId: session.user.id,
        //     action: 'UPDATE_COURSE',
        //     details: `Updated course: ${updatedCourse.title}`,
        //     targetId: updatedCourse.id,
        //     targetType: 'course'
        //   }
        // })
        return __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$thegreatbulls$2d$react$2f$thegreatbulls_v1$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(updatedCourse);
    } catch (error) {
        console.error('Error updating course:', error);
        const errorMessage = error instanceof Error ? error.message : 'Internal server error';
        return __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$thegreatbulls$2d$react$2f$thegreatbulls_v1$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Failed to update course',
            details: errorMessage
        }, {
            status: 500
        });
    }
}
async function DELETE(request, context) {
    try {
        // Temporarily remove auth check for testing
        // const session = await getServerSession(authOptions)
        // if (!session || session.user.role !== 'admin') {
        //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        // }
        // Verify course exists
        const { id: courseId } = await context.params;
        if (!courseId) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$thegreatbulls$2d$react$2f$thegreatbulls_v1$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Course id is missing'
            }, {
                status: 400
            });
        }
        const course = await __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$thegreatbulls$2d$react$2f$thegreatbulls_v1$2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].course.findUnique({
            where: {
                id: courseId
            }
        });
        if (!course) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$thegreatbulls$2d$react$2f$thegreatbulls_v1$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Course not found'
            }, {
                status: 404
            });
        }
        // Delete course (cascade will handle related records)
        await __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$thegreatbulls$2d$react$2f$thegreatbulls_v1$2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].course.delete({
            where: {
                id: courseId
            }
        });
        // Log admin action (temporarily disabled)
        // await prisma.adminAction.create({
        //   data: {
        //     adminId: session.user.id,
        //     action: 'DELETE_COURSE',
        //     details: `Deleted course: ${course.title}`,
        //     targetId: params.id,
        //     targetType: 'course'
        //   }
        // })
        return __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$thegreatbulls$2d$react$2f$thegreatbulls_v1$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            message: 'Course deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting course:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$Projects$2f$thegreatbulls$2d$react$2f$thegreatbulls_v1$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Internal server error'
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__6fba74a6._.js.map