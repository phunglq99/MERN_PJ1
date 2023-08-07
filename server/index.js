import express from 'express';
import bodyParser from 'body-parser'; // một thư viện mã hóa dữ liệu được sử dụng chủ yếu để bảo mật mật khẩu trong ứng dụng web
import mongoose from 'mongoose';
import cors from 'cors'; //CORS (Cross-Origin Resource Sharing) là một chính sách bảo mật trong trình duyệt web để giới hạn truy cập tài nguyên từ các nguồn (origin) khác nhau. Một origin bao gồm scheme (http, https), domain và port của một trang web.
import dotenv from 'dotenv'; //Thư viện dotenv cho phép bạn định nghĩa các biến môi trường trong một tệp .env và tải các giá trị từ tệp này vào quá trình chạy của ứng dụng.
import multer from 'multer'; // là một middleware Node.js được sử dụng để xử lý dữ liệu đa phương tiện (multipart/form-data) trong các yêu cầu HTTP. Nó thường được sử dụng để xử lý tải lên (upload) các tệp tin từ trình duyệt lên máy chủ.
import helmet from 'helmet'; // là một middleware bảo mật cho ứng dụng Express trong Node.js. Nó giúp bảo vệ ứng dụng của bạn khỏi các cuộc tấn công liên quan đến bảo mật bằng cách thiết lập các tiêu đề HTTP liên quan đến bảo mật.
import morgan from 'morgan'; // là một middleware ghi lại (logging) cho ứng dụng Express trong Node.js. Nó giúp ghi lại thông tin về các yêu cầu HTTP và phản hồi tương ứng để theo dõi và gỡ lỗi ứng dụng.
import path from 'path';
import { fileURLToPath } from 'url';
import { verifyToken } from './middleware/auth.js';
import { register } from './controllers/auth.js';
import { createPost } from './controllers/posts.js';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import postRoutes from './routes/posts.js';
import { users, posts } from './data/index.js';
import User from './models/Users.js';
import Post from './models/Post.js';

/* CONFIGURATIONS */
const __filename = fileURLToPath(import.meta.url); // chỉ sử dụng trên module: "type": "module",
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan('common'));
app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());
app.use('/assets', express.static(path.join(__dirname, 'public/assets')));

/* FILE STORAGE*/
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/assets');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
const upload = multer({ storage });

/* ROUTES WITH FILES */
app.post('/auth/register', upload.single('picture'), register);
app.post('/posts', verifyToken, upload.single('picture'), createPost);

/* ROUTES */
// [GET]: /auth/login
app.use('/auth', authRoutes);
// [GET]: /users/:id
app.use('/users', userRoutes);
// [GET]: /users/:id
app.use('/posts', postRoutes);

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 6001;
mongoose
    .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: 'Sociopedia'
    })
    .then(() => {
        app.listen(PORT, () => console.log(`Server Port: ${PORT}`));

        /* ADD DATA ONE TIME */
        // User.insertMany(users);
        // Post.insertMany(posts);
    })
    .catch((error) => console.log(`${error} did not connect`));
