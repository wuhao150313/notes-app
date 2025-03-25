// import { Form, Input, Button, Typography } from 'antd';
// import { registerUser } from '@/api/userApi';
// import { useStore } from '@/store/userStore';
// import { useNavigate } from 'react-router-dom';

// const { Title } = Typography;

// const Register = () => {
//   const { setUser } = useStore();
//   const navigate = useNavigate();

//   const onFinish = async (values) => {
//     try {
//       const response = await registerUser(values);
//       setUser(response.data); // 设置用户信息
//       alert('注册成功');
//       navigate('/login'); // 跳转到登录页
//     } catch (error) {
//       console.error('Registration failed:', error);
//     }
//   };

//   return (
//     <div className="flex justify-center items-center h-screen bg-blue-200">
//       <div className="bg-white p-8 rounded-md shadow-lg w-150 mx-auto mt-20">
//         <Title level={2}>注册</Title>
//         <Form onFinish={onFinish}>
//           <Form.Item
//             name="username"
//             rules={[{ required: true, message: '请输入用户名！' }]}
//           >
//             <Input placeholder="用户名" />
//           </Form.Item>

//           <Form.Item
//             name="email"
//             rules={[{ required: true, message: '请输入邮箱！' }]}
//           >
//             <Input placeholder="邮箱" />
//           </Form.Item>

//           <Form.Item
//             name="password"
//             rules={[{ required: true, message: '请输入密码！' }]}
//           >
//             <Input.Password placeholder="密码" />
//           </Form.Item>

//           <Form.Item>
//             <Button type="primary" htmlType="submit" block>
//               注册
//             </Button>
//           </Form.Item>
//         </Form>

//         <div className="text-center mt-4">
//           已经有账号？<a href="/login">去登录</a>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Register;

import { Form, Input, Button, Typography } from 'antd';
import { registerUser } from '@/api/userApi';
import { useStore } from '@/store/userStore';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;

const Register = () => {
  const { setUser } = useStore();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const response = await registerUser(values);
      setUser(response.data); // 设置用户信息
      alert('注册成功');
      navigate('/login'); // 跳转到登录页
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#bfdbfe', // bg-blue-200
      }}
    >
      <div
        style={{
          backgroundColor: '#fff',
          padding: '2rem',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          width: '400px',
          marginTop: '5rem',
        }}
      >
        <Title
          level={2}
          style={{ textAlign: 'center', marginBottom: '1.5rem' }}
        >
          注册
        </Title>

        <Form onFinish={onFinish}>
          <Form.Item
            name="username"
            rules={[{ required: true, message: '请输入用户名！' }]}
          >
            <Input
              placeholder="用户名"
              style={{
                width: '100%',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                padding: '0.5rem',
              }}
            />
          </Form.Item>

          <Form.Item
            name="email"
            rules={[{ required: true, message: '请输入邮箱！' }]}
          >
            <Input
              placeholder="邮箱"
              style={{
                width: '100%',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                padding: '0.5rem',
              }}
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: '请输入密码！' }]}
          >
            <Input.Password
              placeholder="密码"
              style={{
                width: '100%',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                padding: '0.5rem',
              }}
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{
                width: '100%',
                padding: '1rem',
                fontSize: '16px',
              }}
            >
              注册
            </Button>
          </Form.Item>
        </Form>

        <div style={{ textAlign: 'center', marginTop: '1rem' }}>
          已经有账号？<a href="/login">去登录</a>
        </div>
      </div>
    </div>
  );
};

export default Register;
