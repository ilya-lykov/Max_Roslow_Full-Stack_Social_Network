const { prisma } = require('../../prisma/prisma-client');

const UsersRepository = {
    create: async ({ email, password, name, avatarUrl }) => {
        console.log(avatarUrl);
        return prisma.user.create({
            data: {
                email,
                password,
                name,
                avatarUrl: `uploads/${avatarUrl}`
            }
        });
    },
    find: async (email) => {
        return prisma.user.findUnique({ where: { email } });
    },
    findById: async (id) => {
        return prisma.user.findUnique({
            where: { id },
            include: {
                followers: true,
                following: true
            }
        });
    },
    isFollowing: async (id, userId) => {
        return await prisma.follows.findFirst({
            where: {
                AND: [
                    { followerId: userId },
                    { followingId: id }
                ]
            }
        });
    },
    getCurrentUser: async (userId) => {
        return prisma.user.findUnique({
            where: {
                id: userId
            },
            include: {
                followers: {
                    include: {
                        follower: true
                    }
                },
                following: {
                    include: {
                        following: true
                    }
                }
            }
        });
    }
};

module.exports = UsersRepository;