
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import { Droplet } from 'lucide-react';

const loginSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
});

const signupSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

const forgotPasswordSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
});

type LoginFormValues = z.infer<typeof loginSchema>;
type SignupFormValues = z.infer<typeof signupSchema>;
type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

const Auth = () => {
  const { user, loading, signIn, signUp, forgotPassword } = useAuth();
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  
  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const signupForm = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: { email: '', password: '', confirmPassword: '' },
  });

  const forgotPasswordForm = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: '' },
  });

  const handleLogin = async (values: LoginFormValues) => {
    try {
      await signIn(values.email, values.password);
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const handleSignup = async (values: SignupFormValues) => {
    try {
      await signUp(values.email, values.password);
      setActiveTab('login');
    } catch (error) {
      console.error('Signup error:', error);
    }
  };

  const handleForgotPassword = async (values: ForgotPasswordFormValues) => {
    try {
      await forgotPassword(values.email);
      setShowForgotPassword(false);
    } catch (error) {
      console.error('Forgot password error:', error);
    }
  };

  // Redirect authenticated users to home
  if (user && !loading) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-swimspot-drift-sand flex flex-col">
      <div className="container mx-auto px-4 py-8 flex-grow flex flex-col items-center justify-center">
        <div className="w-full max-w-md">
          <div className="flex justify-center mb-8">
            <div className="flex items-center gap-2">
              <Droplet className="h-10 w-10 text-swimspot-blue-green" />
              <span className="font-serif text-3xl font-medium text-swimspot-blue-green">SwimSpot</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg">
            {!showForgotPassword ? (
              <Tabs defaultValue={activeTab} value={activeTab} onValueChange={(value) => setActiveTab(value as 'login' | 'signup')}>
                <TabsList className="grid grid-cols-2 mb-6">
                  <TabsTrigger value="login">Sign In</TabsTrigger>
                  <TabsTrigger value="signup">Create Account</TabsTrigger>
                </TabsList>

                <TabsContent value="login">
                  <Form {...loginForm}>
                    <form onSubmit={loginForm.handleSubmit(handleLogin)} className="space-y-4">
                      <FormField
                        control={loginForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input placeholder="you@example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={loginForm.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                              <Input type="password" placeholder="••••••••" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button
                        type="submit"
                        className="w-full bg-swimspot-blue-green hover:bg-swimspot-blue-green/90"
                        disabled={loginForm.formState.isSubmitting}
                      >
                        {loginForm.formState.isSubmitting ? 'Signing in...' : 'Sign In'}
                      </Button>
                      <Button
                        type="button"
                        variant="link"
                        className="w-full text-swimspot-blue-green"
                        onClick={() => setShowForgotPassword(true)}
                      >
                        Forgot your password?
                      </Button>
                    </form>
                  </Form>
                </TabsContent>

                <TabsContent value="signup">
                  <Form {...signupForm}>
                    <form onSubmit={signupForm.handleSubmit(handleSignup)} className="space-y-4">
                      <FormField
                        control={signupForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input placeholder="you@example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={signupForm.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                              <Input type="password" placeholder="••••••••" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={signupForm.control}
                        name="confirmPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Confirm Password</FormLabel>
                            <FormControl>
                              <Input type="password" placeholder="••••••••" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button
                        type="submit"
                        className="w-full bg-swimspot-burnt-coral hover:bg-swimspot-burnt-coral/90"
                        disabled={signupForm.formState.isSubmitting}
                      >
                        {signupForm.formState.isSubmitting ? 'Creating account...' : 'Create Account'}
                      </Button>
                    </form>
                  </Form>
                </TabsContent>
              </Tabs>
            ) : (
              <div>
                <h2 className="text-xl font-medium mb-4">Reset Password</h2>
                <Form {...forgotPasswordForm}>
                  <form onSubmit={forgotPasswordForm.handleSubmit(handleForgotPassword)} className="space-y-4">
                    <FormField
                      control={forgotPasswordForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="you@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="submit"
                      className="w-full bg-swimspot-blue-green hover:bg-swimspot-blue-green/90"
                      disabled={forgotPasswordForm.formState.isSubmitting}
                    >
                      {forgotPasswordForm.formState.isSubmitting ? 'Sending...' : 'Send Reset Link'}
                    </Button>
                    <Button
                      type="button"
                      variant="link"
                      className="w-full text-swimspot-blue-green"
                      onClick={() => setShowForgotPassword(false)}
                    >
                      Back to Sign In
                    </Button>
                  </form>
                </Form>
              </div>
            )}
          </div>

          <p className="text-center text-sm text-gray-500 mt-6">
            By signing up, you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </div>

      <footer className="py-4 text-center text-xs text-gray-500">
        &copy; {new Date().getFullYear()} SwimSpot. All rights reserved.
      </footer>
    </div>
  );
};

export default Auth;
