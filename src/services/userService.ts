import prisma from "../prisma";

class UserService {


    async fetchUser(email: string) {
        return await prisma.user.findMany({
            include: {
                userInfo: {
                    select: {
                        address: true,
                        phone: true
                    }
                }
            },
            where: {
                OR: [

                    {
                        email: {
                            contains: email,
                            mode: "insensitive"
                        }
                    }
                ]
            }
        });
    }
    async insertUser(name: string, email: string, address?: string, phone?: string) {
        return await prisma.user.create({
            include: {
                userInfo: true
            },
            data: {
                name, email,
                userInfo: {
                    create: {
                        address: address ?? '',
                        phone: phone ?? ''

                    }
                }
            },
        });
    }


}


export default new UserService 