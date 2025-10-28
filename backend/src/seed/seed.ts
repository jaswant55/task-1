import * as mongoose from 'mongoose';
// import * as dotenv from 'dotenv';
// dotenv.config();
import * as bcrypt from 'bcryptjs';
import { UserSchema } from '../modules/users/users.schema';
import { ProjectSchema } from '../modules/projects/project.schema';
import { TaskSchema } from '../modules/tasks/task.schema';

async function run() {
    //database connection url
    const uri = process.env.MONGO_URI || 'mongodb://localhost:27017';
    //connect the database
    await mongoose.connect(uri);

    const User = mongoose.model('User', UserSchema);
    const Project = mongoose.model('Project', ProjectSchema);
    const Task = mongoose.model('Task', TaskSchema);

    // cleanup all previous record
    await User.deleteMany({});
    await Project.deleteMany({});
    await Task.deleteMany({});

    //plan password bcrypt
    const plainPassword = 'Test@123';
    const hashed = await bcrypt.hash(plainPassword, 10);

    //create the user
    const user = await User.create({ email: 'test@example.com', password: hashed, name: 'Test User' });

    //create the project
    const p1 = await Project.create({ title: 'Project Alpha', description: 'Alpha desc', status: 'active', owner: user._id });
    const p2 = await Project.create({ title: 'Project Beta', description: 'Beta desc', status: 'active', owner: user._id });
    //create the task for the projects
    const tasks = [
        { title: 'Task 1', description: 't1', status: 'todo', project: p1._id },
        { title: 'Task 2', description: 't2', status: 'in-progress', project: p1._id },
        { title: 'Task 3', description: 't3', status: 'done', project: p1._id },

        { title: 'Task A', description: 'ta', status: 'todo', project: p2._id },
        { title: 'Task B', description: 'tb', status: 'todo', project: p2._id },
        { title: 'Task C', description: 'tc', status: 'in-progress', project: p2._id },
    ];

    await Task.insertMany(tasks);

    console.log('Seed complete. User: test@example.com / Test@123');
    await mongoose.disconnect();
}

run().catch(e => {
    console.error(e);
    process.exit(1);
});
