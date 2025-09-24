import { Link } from 'react-router-dom';
import { Shield, Mail, Phone, MapPin } from 'lucide-react';
import logo from '@/assets/logo.png';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-t from-background to-muted pt-20 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <img src={logo} alt="احراز هویت ایمن" className="w-12 h-12" />
              <span className="text-persian-lg font-bold">احراز هویت ایمن</span>
            </div>
            <p className="text-persian-base text-muted-foreground leading-relaxed">
              ارائه‌دهنده پیشرو خدمات احراز هویت ایمن و پیشرفته برای کسب‌وکارهای آنلاین
            </p>
            <div className="flex gap-4">
              {/* Social Media Icons */}
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center hover:bg-primary/20 transition-colors duration-300 cursor-pointer">
                <Shield size={20} className="text-primary" />
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-persian-lg font-semibold">دسترسی سریع</h3>
            <div className="space-y-3">
              <Link to="/" className="block text-persian-base text-muted-foreground hover:text-primary transition-colors duration-300">
                صفحه اصلی
              </Link>
              <Link to="/features" className="block text-persian-base text-muted-foreground hover:text-primary transition-colors duration-300">
                قابلیت‌ها
              </Link>
              <Link to="/pricing" className="block text-persian-base text-muted-foreground hover:text-primary transition-colors duration-300">
                قیمت‌گذاری
              </Link>
              <Link to="/docs" className="block text-persian-base text-muted-foreground hover:text-primary transition-colors duration-300">
                مستندات
              </Link>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-6">
            <h3 className="text-persian-lg font-semibold">خدمات</h3>
            <div className="space-y-3">
              <div className="text-persian-base text-muted-foreground">احراز هویت دومرحله‌ای</div>
              <div className="text-persian-base text-muted-foreground">مدیریت جلسات کاربری</div>
              <div className="text-persian-base text-muted-foreground">تایید هویت بیومتریک</div>
              <div className="text-persian-base text-muted-foreground">امنیت پیشرفته</div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h3 className="text-persian-lg font-semibold">تماس با ما</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail size={18} className="text-primary" />
                <span className="text-persian-base text-muted-foreground">info@secureauth.ir</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={18} className="text-primary" />
                <span className="text-persian-base text-muted-foreground">۰۲۱-۱۲۳۴۵۶۷۸</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin size={18} className="text-primary" />
                <span className="text-persian-base text-muted-foreground">تهران، ایران</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-persian-base text-muted-foreground">
              © {currentYear} احراز هویت ایمن. تمامی حقوق محفوظ است.
            </p>
            <div className="flex gap-6">
              <Link to="/privacy" className="text-persian-base text-muted-foreground hover:text-primary transition-colors duration-300">
                حریم خصوصی
              </Link>
              <Link to="/terms" className="text-persian-base text-muted-foreground hover:text-primary transition-colors duration-300">
                شرایط استفاده
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;