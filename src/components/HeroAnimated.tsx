import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Shield, Lock, Users, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import heroCharacter from '@/assets/hero-character.png';
import heroBackground from '@/assets/hero-background.png';

// GSAP will be loaded via CDN in index.html
declare global {
  interface Window {
    gsap: any;
    ScrollTrigger: any;
  }
}

const HeroAnimated = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const characterRef = useRef<HTMLImageElement>(null);
  const magnifierRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if we're in browser and GSAP is loaded
    if (typeof window === 'undefined' || !window.gsap) return;

    const { gsap, ScrollTrigger } = window;

    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    // Create main timeline
    const tl = gsap.timeline();

    // Initial setup - hide elements
    gsap.set([titleRef.current, subtitleRef.current, statsRef.current], {
      opacity: 0,
      y: 60,
    });

    gsap.set(characterRef.current, {
      opacity: 0,
      scale: 0.8,
      rotation: -10,
    });

    gsap.set(magnifierRef.current, {
      opacity: 0,
      scale: 0.5,
      rotation: 45,
    });

    // Entrance animations
    tl.to(titleRef.current, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power3.out",
    })
    .to(subtitleRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out",
    }, "-=0.5")
    .to(characterRef.current, {
      opacity: 1,
      scale: 1,
      rotation: 0,
      duration: 1.2,
      ease: "back.out(1.7)",
    }, "-=0.6")
    .to(magnifierRef.current, {
      opacity: 1,
      scale: 1,
      rotation: 0,
      duration: 1,
      ease: "back.out(1.7)",
    }, "-=0.8")
    .to(statsRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out",
    }, "-=0.4");

    // Scroll-triggered animations
    ScrollTrigger.create({
      trigger: heroRef.current,
      start: "top top",
      end: "bottom top",
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress;
        
        // Character movement and rotation
        gsap.to(characterRef.current, {
          x: progress * 100,
          y: progress * -50,
          rotation: progress * 360,
          scale: 1 - progress * 0.3,
          duration: 0.3,
          ease: "none",
        });

        // Magnifier glass effect
        gsap.to(magnifierRef.current, {
          x: progress * -150,
          y: progress * 75,
          rotation: progress * -180,
          scale: 1 + progress * 0.5,
          duration: 0.3,
          ease: "none",
        });

        // Background parallax
        gsap.to('.hero-bg', {
          y: progress * 200,
          scale: 1 + progress * 0.2,
          duration: 0.3,
          ease: "none",
        });
      },
    });

    // Floating animation for magnifier
    gsap.to(magnifierRef.current, {
      y: "+=20",
      duration: 2,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
    });

    // Character subtle breathing animation
    gsap.to(characterRef.current, {
      scale: 1.02,
      duration: 3,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
    });

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      tl?.kill();
    };
  }, []);

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="hero-bg absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${heroBackground})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background/80 z-10" />

      <div className="container mx-auto px-6 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-screen py-20">
          
          {/* Content */}
          <div className="text-center lg:text-right space-y-8">
            <h1 
              ref={titleRef}
              className="text-persian-xl lg:text-6xl xl:text-7xl font-bold text-foreground leading-tight"
            >
              احراز هویت
              <span className="block text-transparent bg-gradient-primary bg-clip-text">
                ایمن و پیشرفته
              </span>
            </h1>
            
            <p 
              ref={subtitleRef}
              className="text-persian-lg text-muted-foreground max-w-2xl mx-auto lg:mx-0 leading-relaxed"
            >
              با قدرتمندترین سیستم احراز هویت، امنیت کاربران خود را تضمین کنید. 
              راه‌حل جامع برای مدیریت کاربران و تایید هویت در عصر دیجیتال
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link to="/auth?type=signup">
                <Button className="btn-persian-primary text-persian-base px-8 py-6">
                  شروع رایگان
                </Button>
              </Link>
              <Link to="/docs">
                <Button className="btn-persian-outline text-persian-base px-8 py-6">
                  مشاهده مستندات
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8">
              <div className="text-center lg:text-right">
                <div className="flex items-center justify-center lg:justify-start gap-2 mb-2">
                  <Users className="text-primary" size={24} />
                  <span className="text-2xl font-bold text-foreground">۱۰۰K+</span>
                </div>
                <p className="text-muted-foreground">کاربر فعال</p>
              </div>
              
              <div className="text-center lg:text-right">
                <div className="flex items-center justify-center lg:justify-start gap-2 mb-2">
                  <Shield className="text-primary" size={24} />
                  <span className="text-2xl font-bold text-foreground">۹۹.۹%</span>
                </div>
                <p className="text-muted-foreground">آپتایم</p>
              </div>
              
              <div className="text-center lg:text-right">
                <div className="flex items-center justify-center lg:justify-start gap-2 mb-2">
                  <Lock className="text-primary" size={24} />
                  <span className="text-2xl font-bold text-foreground">۲۵۶bit</span>
                </div>
                <p className="text-muted-foreground">رمزنگاری</p>
              </div>
              
              <div className="text-center lg:text-right">
                <div className="flex items-center justify-center lg:justify-start gap-2 mb-2">
                  <Zap className="text-primary" size={24} />
                  <span className="text-2xl font-bold text-foreground">۱ms</span>
                </div>
                <p className="text-muted-foreground">پاسخ‌دهی</p>
              </div>
            </div>
          </div>

          {/* Animated Character */}
          <div className="relative flex items-center justify-center lg:justify-end">
            {/* Character Image */}
            <img
              ref={characterRef}
              src={heroCharacter}
              alt="متخصص امنیت با ذره‌بین"
              className="w-full max-w-lg h-auto relative z-20"
            />
            
            {/* Magnifier Glass Effect */}
            <div
              ref={magnifierRef}
              className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full border-4 border-primary bg-primary/10 backdrop-blur-sm magnifier-glow z-30 flex items-center justify-center"
            >
              <Shield className="text-primary" size={40} />
            </div>

            {/* Floating particles */}
            <div className="absolute inset-0 z-10">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className={`absolute w-2 h-2 bg-primary rounded-full opacity-60 animate-float`}
                  style={{
                    top: `${20 + i * 15}%`,
                    right: `${10 + i * 12}%`,
                    animationDelay: `${i * 0.5}s`,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroAnimated;