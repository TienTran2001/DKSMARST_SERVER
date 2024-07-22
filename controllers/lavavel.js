const asyncHandler = require('express-async-handler');
const statusCode = require('../utils/statusCode');
const { throwErrorWithStatus } = require('../middlewares/errorHandler');

//lay danh sach users

const fakeDataUser = [
  {
    id: 1,
    avatar:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    name: 'Mior Zaki',
    email: 'mior@nova.laravel.com',
    admin: 0,
    twoFa: 1,
  },
  {
    id: 2,
    avatar:
      'https://i.pinimg.com/564x/c8/d3/6e/c8d36ef31d31f22dc0a0ba29104baf1c.jpg',
    name: 'Suzy Kim',
    email: 'suzykim@gmail.com',
    admin: 1,
    twoFa: 1,
  },
  {
    id: 3,
    avatar:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    name: 'Dries Vints',
    email: 'dries@nova.laravel.com',
    admin: 0,
    twoFa: 0,
  },
  {
    id: 4,
    avatar:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    name: 'Ian Landsman',
    email: 'ian@nova.laravel.com',
    admin: 0,
    twoFa: 1,
  },
  {
    id: 5,
    avatar:
      'https://i.pinimg.com/736x/9d/ab/b3/9dabb3f3d0ea95b4f5de998430277606.jpg',
    name: 'Kim Ye-Young',
    email: 'kimhyeyoon@gmail.com',
    admin: 1,
    twoFa: 0,
  },
  {
    id: 6,
    avatar:
      'https://images.unsplash.com/photo-1440589473619-3cde28941638?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    name: 'Mohamed Said',
    email: 'mohamed@nova.laravel.com',
    admin: 0,
    twoFa: 1,
  },
  {
    id: 7,
    avatar:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    name: 'Suzy',
    email: 'suzy@gmail.com',
    admin: 0,
    twoFa: 1,
  },
  {
    id: 8,
    avatar:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    name: 'Suzy',
    email: 'suzy@gmail.com',
    admin: 0,
    twoFa: 1,
  },
  {
    id: 9,
    avatar:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    name: 'Suzy',
    email: 'suzy@gmail.com',
    admin: 0,
    twoFa: 1,
  },
  {
    id: 10,
    avatar:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    name: 'Suzy',
    email: 'suzy@gmail.com',
    admin: 0,
    twoFa: 1,
  },
];

const getAllUser = asyncHandler(async (req, res) => {
  let { limit = 7, page = 1, name, ...query } = req.query;

  limit = parseInt(limit);
  page = parseInt(page);

  let filteredUsers = fakeDataUser;
  if (name) {
    filteredUsers = fakeDataUser.filter((user) =>
      user.name.toLowerCase().includes(name.toLowerCase())
    );
  }

  const totalUsers = filteredUsers.length;
  const totalPages = Math.ceil(totalUsers / limit);
  const offset = (page - 1) * limit;

  // Paginate the users
  const paginatedUsers = filteredUsers.slice(offset, offset + limit);

  res.json({
    success: true,
    message: 'Lấy danh sách thành công.',
    totalPages,
    users: paginatedUsers,
  });
});

module.exports = {
  getAllUser,
};
