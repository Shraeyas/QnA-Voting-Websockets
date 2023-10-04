import express from 'express';
import prisma from './prisma';

const app = express();
app.get("/", (req, res) => {
    res.send("Hello, World!");
});

const server = require('http').Server(app)
const io = require('socket.io')(server, {
    cors: {
        origin: ['http://localhost:5173']
    }
});


app.get("/test-event", (req, res) => {
    io.on('connection', (socket: any) => {
        socket.broadcast.emit('updateQuestion', []);
    });
    res.send("Event Sent");
});

const port = 5000;
server.listen(port, () => {
    console.log(`Server running on port ${port}`)
});

io.on('connection', (socket: any) => {
    socket.on('joinRoom', (roomId: string) => {
        if(roomId) {
            socket.join(roomId);
            (async () => {
                let questions = await prisma.question.findMany({
                    where: {
                        roomId: roomId
                    },
                    include: {
                        upvotes: true,
                    },
                });

                const questionsWithUpvoteCount = questions.map(question => ({
                    ...question,
                    upvotesCount: question.upvotes.length,
                }));

                io.to(roomId).emit('updateQuestion', questionsWithUpvoteCount);
            })();
        }
    });

    socket.on('submitQuestion', (roomId: string, questionText: string) => {
        (async () => {
            try {
                await prisma.question.create({
                    data: {
                        text: questionText,
                        userId: socket.id,
                        roomId: roomId
                    }
                });
                
                let questions = await prisma.question.findMany({
                    where: {
                        roomId: roomId
                    },
                    include: {
                        upvotes: true,
                    },
                });

                const questionsWithUpvoteCount = questions.map(question => ({
                    ...question,
                    upvotesCount: question.upvotes.length,
                }));

                io.to(roomId).emit('updateQuestion', questionsWithUpvoteCount)
            }
            catch(e) {

            }
        })();
    });

    socket.on('upvoteQuestion', (roomId: string, questionId: number, userId: string) => {
        console.log('upvoted')
        console.log({roomId, questionId, userId});
        (async () => {
            const upsertObject = {
                questionId,
                userId
            }
            try {
                await prisma.upvote.upsert({
                    where: {
                        questionId_userId: upsertObject
                    },
                    create: upsertObject,
                    update: { }
                });
                

                let questions = await prisma.question.findMany({
                    where: {
                        roomId: roomId
                    },
                    include: {
                        upvotes: true,
                    },
                });

                const questionsWithUpvoteCount = questions.map(question => ({
                    ...question,
                    upvotesCount: question.upvotes.length,
                }));

                io.to(roomId).emit('updateQuestion', questionsWithUpvoteCount)
                console.log(questions);
            }
            catch(e) {
                console.log('error', e)
            }
        })();
    });
});