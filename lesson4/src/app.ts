import 'reflect-metadata';
import express, { Request, Response } from 'express';
import { createConnection, getManager } from 'typeorm';
import { Users } from './entity/users';
import { Posts } from './entity/posts';
import { Comments } from './entity/comments';

// 1)Повторіть всі ендпоінти як в мене
// 2)Створіть міграцію для таблиці comments, яка буде мати такі поля
// (id, text, authorId, postId, like, dislike, createdAt,deletedAt),
// відповідно звязок з таблицею юзерс і постс
// 3)Створіть ендпоінт get /posts/userId - який буде виводити пости якогось юзера який їх створив
// 4)update /posts/userId можна оновити текст про пост
// 5)get comments/userId вивести коментарі які належать юзеру який їх написав і пости в яких вони
// написані (якщо через квері почитаєте як там зробити мulti select)
// *6) update /comments/action написати ендпоінт який буде приймати в body commentId,
// action(like, dislike) і оновлювати в бд інформацію про кількість лайків і дизлайків в коментарі

const app = express();
app.use(express.json());
app.use(express.urlencoded());

app.get('/posts/:userId', async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const postsOfUser = await getManager().getRepository(Posts).find({
            where: {
                userId: Number(userId),
            },
        });
        res.status(201).json(postsOfUser);
    } catch (e) {
        console.log(e);
    }
});

app.put('/posts/:userId', async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const { text } = req.body;
        const updatedPostText = await getManager().getRepository(Posts)
            .update({ id: Number(userId) }, { text });

        res.status(200).json(updatedPostText);
    } catch (e) {
        console.log(e);
    }
});

app.get('/comments/:userId', async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;

        const fiendUserCommentsForPost = await getManager().getRepository(Comments)
            .createQueryBuilder('comment')
            .where(`comment.authorId = ${Number(userId)}`)
            .leftJoinAndSelect('comment.user', 'user')
            .leftJoinAndSelect('comment.post', 'post')
            .getMany();

        console.log(fiendUserCommentsForPost);

        res.status(201).json(fiendUserCommentsForPost);
    } catch (e) {
        console.log(e);
    }
});

app.post('/comments/action', async (req: Request, res: Response) => {
    try {
        const { commentId, action } = req.body;

        const comment = await getManager().getRepository(Comments)
            .createQueryBuilder('comment')
            .where(`comment.id = ${Number(commentId)}`)
            .getOne();

        if (!comment) {
            throw new Error('Not comment for this Id');
        }

        if (action === 'like') {
            await getManager().getRepository(Comments)
                .update({ id: Number(commentId) }, { like: comment.like + 1 });
        }

        if (action === 'dislike') {
            await getManager().getRepository(Comments)
                .update({ id: Number(commentId) }, { dislike: comment.dislike + 1 });
        }

        res.status(201).json('Well done!!!');
    } catch (e) {
        console.log(e);
        res.send('Not comment for this Id');
    }
});

app.get('/users', async (req: Request, res: Response) => {
    try {
        const users = await getManager().getRepository(Users).find({ relations: ['posts'] });
        res.json(users);
    } catch (e) {
        console.log(e);
    }
});

app.get('/users/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const fiendUser = await getManager().getRepository(Users)
            .createQueryBuilder('user')
            .where(`user.id = ${Number(id)}`)
            .getOne();
        res.status(201).json(fiendUser);
    } catch (e) {
        console.log(e);
    }
});

// app.get('/users', async (req: Request, res: Response) => {
//     try {
//         const users = await getManager().getRepository(Users)
//             .createQueryBuilder('users')
//             .where('users.firstName = "aaaaa" ')
//             .getMany();
//         res.json(users);
//     } catch (e) {
//         console.log(e);
//     }
// });

app.patch('/users/:id', async (req: Request, res: Response) => {
    try {
        const { password, email } = req.body;
        const { id } = req.params;
        const updatedUser = await getManager().getRepository(Users)
            .update({ id: Number(id) }, {
                password,
                email,
            });
        console.log(updatedUser);
        res.json(updatedUser);
    } catch (e) {
        console.log(e);
    }
});

app.post('/users', async (req: Request, res: Response) => {
    try {
        const createdUser = await getManager().getRepository(Users).save(req.body);
        res.status(201).json(createdUser);
    } catch (e) {
        console.log(e);
    }
});

app.delete('/users/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const userToDelete = await getManager().getRepository(Users)
            .delete({ id: Number(id) });
        res.json(userToDelete);
    } catch (e) {
        console.log(e);
    }
});

// app.delete('/users/:id', async (req: Request, res: Response) => {
//     try {
//         const { id } = req.params;
//         const userToDelete = await getManager().getRepository(Users)
//             .softDelete({ id: Number(id) });
//         res.json(userToDelete);
//     } catch (e) {
//         console.log(e);
//     }
// });

const PORT = 5500;

app.listen(PORT, async () => {
    console.log(`Server has been started on ${PORT} port...`);
    try {
        const connection = await createConnection();
        if (connection) {
            console.log('Database connected...');
        }
    } catch (e) {
        if (e) {
            console.log(e);
        }
    }
});
