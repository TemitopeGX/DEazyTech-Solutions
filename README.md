# DEazy Tech Solutions

A modern, responsive website for DEazy Tech Solutions built with Next.js, TypeScript, and Tailwind CSS. The website showcases the company's services, expertise, and professional team while providing an intuitive interface for potential clients to get in touch.

![DEazy Tech Solutions](public/images/logo-white.png)

## 🚀 Features

- **Modern Design**: Sleek, professional UI with smooth animations and transitions
- **Fully Responsive**: Optimized for all device sizes from mobile to desktop
- **Performance Optimized**: Fast loading times and optimized assets
- **SEO Ready**: Built with SEO best practices in mind

### 🎯 Key Sections

- **Homepage**: Company overview and key services
- **Services**: Detailed information about offered services
- **Hire Experts**: Team profiles and expertise areas
- **Contact**: Easy-to-use contact form and company information
- **Admin Dashboard**: Secure admin panel for content management

## 🛠️ Tech Stack

- **Frontend**:

  - Next.js 14.1.0
  - TypeScript
  - Tailwind CSS
  - Framer Motion
  - Lucide Icons
  - Shadcn UI Components

- **Form Handling**:

  - Formik
  - Yup Validation

- **Notifications**:
  - React Hot Toast

## 📦 Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/TemitopeGX/DEazyTech-Solutions.git
   cd DEazyTech-Solutions
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory and add the following:

   ```env
   NEXT_PUBLIC_API_URL=your_api_url
   DATABASE_URL=your_database_url
   ```

4. **Run the development server**

   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

## 🔧 Configuration

### Database Setup

The project uses MySQL for data storage. Make sure to:

1. Create a MySQL database
2. Update the database connection string in `.env.local`
3. Run migrations:
   ```bash
   npx prisma migrate dev
   ```

### Admin Access

To access the admin dashboard:

1. Create an admin user in the database
2. Visit `/admin/login`
3. Use your credentials to log in

## 📱 Responsive Design

The website is fully responsive with breakpoints at:

- Mobile: 320px - 767px
- Tablet: 768px - 1023px
- Desktop: 1024px and above

## 🎨 Customization

### Colors

The main color scheme uses:

- Primary: `#ff096c` (Pink)
- Secondary: `#8a0faf` (Purple)
- Background: Dynamic (light/dark mode)
- Text: Dynamic (light/dark mode)

### Typography

- Headings: System font stack
- Body: System font stack
- Custom fonts can be added via Tailwind CSS configuration

## 🚀 Deployment

The project is configured for deployment on Vercel:

1. Connect your GitHub repository to Vercel
2. Configure environment variables
3. Deploy with zero configuration

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## 📞 Support

For support, email contact@deazytech.com or create an issue in the repository.

## 🙏 Acknowledgments

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [Framer Motion](https://www.framer.com/motion)
- [Shadcn UI](https://ui.shadcn.com)

---

Developed by TemitopeGX
