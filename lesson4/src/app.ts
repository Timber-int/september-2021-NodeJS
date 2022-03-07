import 'reflect-metadata';
import express, { Request, Response } from 'express';
import { createConnection, getManager } from 'typeorm';
import { Users } from './entity/users';

const app = express();
app.use(express.json());
app.use(express.urlencoded());

app.get('/users', async (req: Request, res: Response) => {
    try {
        const users = await getManager().getRepository(Users).find({ relations: ['posts'] });
        res.json(users);
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

// app.delete('/users/:id', async (req:Request, res:Response) => {
//     try {
//         const { id } = req.params;
//         const userToDelete = await getManager().getRepository(Users)
//             .delete({ id: Number(id) });
//         res.json(userToDelete);
//     } catch (e) {
//         console.log(e);
//     }
// });

app.delete('/users/:id', async (req:Request, res:Response) => {
    try {
        const { id } = req.params;
        const userToDelete = await getManager().getRepository(Users)
            .softDelete({ id: Number(id) });
        res.json(userToDelete);
    } catch (e) {
        console.log(e);
    }
});

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
