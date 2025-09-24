import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, User, Shield } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

interface FormData {
  email: string;
  password: string;
  confirmPassword?: string;
  name?: string;
  family?: string;
}

const Auth = () => {
  const [searchParams] = useSearchParams();
  const [authType, setAuthType] = useState<'login' | 'signup'>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    family: ''
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const { toast } = useToast();

  useEffect(() => {
    const type = searchParams.get('type');
    if (type === 'signup' || type === 'login') {
      setAuthType(type);
    }
  }, [searchParams]);

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    // Email validation
    if (!formData.email) {
      newErrors.email = 'ایمیل الزامی است';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'فرمت ایمیل نامعتبر است';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'رمز عبور الزامی است';
    } else if (formData.password.length < 8) {
      newErrors.password = 'رمز عبور باید حداقل ۸ کاراکتر باشد';
    }

    // Signup specific validations
    if (authType === 'signup') {
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'تکرار رمز عبور مطابقت ندارد';
      }
      
      if (!formData.name) {
        newErrors.name = 'نام الزامی است';
      }
      
      if (!formData.family) {
        newErrors.family = 'نام خانوادگی الزامی است';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock authentication
      const userData = {
        email: formData.email,
        name: formData.name || 'کاربر',
        family: formData.family || 'گرامی',
        token: 'jwt-token-example',
        apiKey: authType === 'signup' ? 'sk-' + Math.random().toString(36).substr(2, 9) : undefined
      };

      // Save to localStorage for demo
      localStorage.setItem('authUser', JSON.stringify(userData));

      toast({
        title: authType === 'login' ? 'ورود موفق' : 'ثبت‌نام موفق',
        description: authType === 'login' 
          ? `خوش آمدید ${userData.name} ${userData.family}` 
          : `حساب شما با موفقیت ایجاد شد. API Key: ${userData.apiKey}`,
      });

      // Redirect to dashboard or home
      setTimeout(() => {
        window.location.href = '/';
      }, 2000);

    } catch (error) {
      toast({
        title: 'خطا',
        description: 'مشکلی در فرآیند احراز هویت رخ داده است.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined
      }));
    }
  };

  return (
    <div className="min-h-screen pt-20 flex items-center justify-center bg-gradient-hero">
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-md mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="mx-auto w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center mb-6">
              <Shield className="text-white" size={40} />
            </div>
            <h1 className="text-persian-xl font-bold mb-2">
              {authType === 'login' ? 'ورود به حساب' : 'ایجاد حساب جدید'}
            </h1>
            <p className="text-persian-base text-muted-foreground">
              {authType === 'login' 
                ? 'به پنل کاربری خود دسترسی پیدا کنید'
                : 'همین حالا حساب کاربری خود را ایجاد کنید'
              }
            </p>
          </div>

          {/* Auth Toggle */}
          <div className="flex bg-muted rounded-lg p-1 mb-8">
            <button
              onClick={() => setAuthType('login')}
              className={`flex-1 py-3 px-4 rounded-md text-persian-base font-medium transition-all duration-200 ${
                authType === 'login'
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              ورود
            </button>
            <button
              onClick={() => setAuthType('signup')}
              className={`flex-1 py-3 px-4 rounded-md text-persian-base font-medium transition-all duration-200 ${
                authType === 'signup'
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              ثبت‌نام
            </button>
          </div>

          {/* Form */}
          <Card className="card-persian">
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Name Fields for Signup */}
                {authType === 'signup' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-persian-base">نام</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 text-muted-foreground" size={18} />
                        <Input
                          id="name"
                          type="text"
                          value={formData.name}
                          onChange={handleInputChange('name')}
                          placeholder="نام خود را وارد کنید"
                          className={`pr-10 text-persian-base ${errors.name ? 'border-destructive' : ''}`}
                        />
                      </div>
                      {errors.name && (
                        <p className="text-sm text-destructive">{errors.name}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="family" className="text-persian-base">نام خانوادگی</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 text-muted-foreground" size={18} />
                        <Input
                          id="family"
                          type="text"
                          value={formData.family}
                          onChange={handleInputChange('family')}
                          placeholder="نام خانوادگی"
                          className={`pr-10 text-persian-base ${errors.family ? 'border-destructive' : ''}`}
                        />
                      </div>
                      {errors.family && (
                        <p className="text-sm text-destructive">{errors.family}</p>
                      )}
                    </div>
                  </div>
                )}

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-persian-base">ایمیل</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 text-muted-foreground" size={18} />
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange('email')}
                      placeholder="example@domain.com"
                      className={`pr-10 text-persian-base ${errors.email ? 'border-destructive' : ''}`}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-sm text-destructive">{errors.email}</p>
                  )}
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-persian-base">رمز عبور</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 text-muted-foreground" size={18} />
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={handleInputChange('password')}
                      placeholder="رمز عبور خود را وارد کنید"
                      className={`pr-10 pl-10 text-persian-base ${errors.password ? 'border-destructive' : ''}`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-sm text-destructive">{errors.password}</p>
                  )}
                </div>

                {/* Confirm Password for Signup */}
                {authType === 'signup' && (
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="text-persian-base">تکرار رمز عبور</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 text-muted-foreground" size={18} />
                      <Input
                        id="confirmPassword"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={handleInputChange('confirmPassword')}
                        placeholder="رمز عبور را مجدد وارد کنید"
                        className={`pr-10 text-persian-base ${errors.confirmPassword ? 'border-destructive' : ''}`}
                      />
                    </div>
                    {errors.confirmPassword && (
                      <p className="text-sm text-destructive">{errors.confirmPassword}</p>
                    )}
                  </div>
                )}

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full btn-persian-primary text-persian-base py-6"
                >
                  {isLoading 
                    ? 'در حال پردازش...' 
                    : authType === 'login' ? 'ورود' : 'ثبت‌نام'
                  }
                </Button>

                {/* Forgot Password for Login */}
                {authType === 'login' && (
                  <div className="text-center">
                    <Link 
                      to="/forgot-password" 
                      className="text-primary hover:underline text-persian-base"
                    >
                      رمز عبور خود را فراموش کرده‌اید؟
                    </Link>
                  </div>
                )}
              </form>
            </CardContent>
          </Card>

          {/* Footer */}
          <div className="text-center mt-8">
            <p className="text-persian-base text-muted-foreground">
              {authType === 'login' ? 'حساب کاربری ندارید؟' : 'قبلاً ثبت‌نام کرده‌اید؟'}
              {' '}
              <button
                onClick={() => setAuthType(authType === 'login' ? 'signup' : 'login')}
                className="text-primary hover:underline font-medium"
              >
                {authType === 'login' ? 'ثبت‌نام کنید' : 'وارد شوید'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;