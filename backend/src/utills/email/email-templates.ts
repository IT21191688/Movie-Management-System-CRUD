const UserRegisteredEmail = (data: any) => {
  return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Welcome to Movie Management System</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f5f5f5;
            padding: 20px;
        }
        .container {
            background-color: #ffffff;
            padding: 20px;
            border-radius: 5px;
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
        }
        h1 {
            color: #333333;
        }
        p {
            font-size: 16px;
            color: #555555;
        }
        a {
            color: #007bff;
            text-decoration: none;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Welcome to Movie Management System, ${data.fullName}!</h1>
        <p>Dear ${data.fullName},</p>
        <p>Congratulations! You have successfully registered on our movie management platform.</p>
        <p>Thank you for joining our platform. We're excited to help you manage your movie collection effectively.</p>
        <p>Feel free to explore our movie catalog, add new movies, and organize your watchlist.</p>
        <p>If you have any questions or need assistance, don't hesitate to contact our support team.</p>
        <p>Enjoy managing your movies!</p>
        <p>Best regards,</p>
        <p>Movie Management System Team</p>
    </div>
</body>
</html>
    `;
};

export default {
  UserRegisteredEmail,
};
