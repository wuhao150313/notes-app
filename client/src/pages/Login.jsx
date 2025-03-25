// import { Form, Input, Button, Typography } from 'antd';
// import { UserOutlined, LockOutlined } from '@ant-design/icons';
// import { loginUser } from '@/api/userApi';
// import { useStore } from '@/store/userStore';
// import { useNavigate } from 'react-router-dom';

// const { Title } = Typography;

// const Login = () => {
//   const { setUser } = useStore();
//   const navigate = useNavigate();

//   const onSubmit = async (values) => {
//     try {
//       const response = await loginUser(values);
//       setUser(response.data); // 设置用户信息
//       alert('登录成功!');
//       navigate('/'); // 跳转到主页
//     } catch (error) {
//       console.error('Login failed:', error);
//       alert('用户名或密码错误');
//     }
//   };

//   return (
//     <div className="flex justify-center items-center h-screen bg-blue-200">
//       <div className="bg-white p-8 rounded-md shadow-lg w-150 mx-auto mt-20">
//         <Title level={2} className="text-center mb-6">
//           登录
//         </Title>
//         <Form name="login_form" onFinish={onSubmit} className="space-y-12">
//           <Form.Item
//             name="username"
//             initialValue="hajimi"
//             rules={[{ required: true, message: '请输入用户名！' }]}
//           >
//             <Input
//               prefix={<UserOutlined />}
//               placeholder="用户名"
//               className="w-full border border-gray-300 rounded-md p-2"
//             />
//           </Form.Item>

//           <Form.Item
//             name="password"
//             initialValue="wu13770728573"
//             rules={[{ required: true, message: '请输入密码！' }]}
//           >
//             <Input.Password
//               prefix={<LockOutlined />}
//               placeholder="密码"
//               className="w-full border border-gray-300 rounded-md p-2"
//             />
//           </Form.Item>

//           <Button type="primary" className="w-full py-5" htmlType="submit">
//             登录
//           </Button>
//         </Form>

//         <div className="text-center mt-4">
//           还没有账号？
//           <a href="/register">去注册</a>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;

import { Form, Input, Button, Typography } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { loginUser } from '@/api/userApi';
import { useStore } from '@/store/userStore';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;

const Login = () => {
  const { setUser } = useStore();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    try {
      const response = await loginUser(values);
      setUser(response.data); // 设置用户信息
      alert('登录成功!');
      navigate('/'); // 跳转到主页
    } catch (error) {
      console.error('Login failed:', error);
      alert('用户名或密码错误');
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#bfdbfe', // 等于 bg-blue-200
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
          登录
        </Title>

        <Form name="login_form" onFinish={onSubmit}>
          <Form.Item
            name="username"
            initialValue="hajimi"
            rules={[{ required: true, message: '请输入用户名！' }]}
          >
            <Input
              prefix={<UserOutlined />}
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
            name="password"
            initialValue="wu13770728573"
            rules={[{ required: true, message: '请输入密码！' }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="密码"
              style={{
                width: '100%',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                padding: '0.5rem',
              }}
            />
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            style={{
              width: '100%',
              padding: '1rem',
              fontSize: '16px',
              marginTop: '0.5rem',
            }}
          >
            登录
          </Button>
        </Form>

        <div style={{ textAlign: 'center', marginTop: '1rem' }}>
          还没有账号？<a href="/register">去注册</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
