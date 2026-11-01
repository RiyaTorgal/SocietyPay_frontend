import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { Tabs, TabsContent } from '@/components/ui/tabs';

import {
  Home,
  Loader2,
  Copy,
  Check,
  X,
  Eye,
} from 'lucide-react';

const Auth = () => {
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  // Demo popup state
  const [showDemo, setShowDemo] = useState(false);
  const [copied, setCopied] = useState('');

  // Demo account credentials
  const demoAccounts = [
    {
      role: 'Resident / User',
      email: 'Riya@society.com',
      password: 'Riya@society.com',
    },
    {
      role: 'Administrator',
      email: 'Admin@society.com',
      password: 'adminPassword123',
    },
  ];

  // Login form state
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  // Register form state
  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const userRole = await login(loginData);

      // Redirect based on role
      if (userRole === 'ADMIN') {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (registerData.password !== registerData.confirmPassword) {
      // You can use toast here
      alert('Passwords do not match');
      return;
    }

    setIsLoading(true);

    try {
      await register({
        name: registerData.name,
        email: registerData.email,
        password: registerData.password,
      });

      setRegisterData({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
      });
    } catch (error) {
      console.error('Registration failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Copy demo credentials
  const copyCredentials = async (
    account: (typeof demoAccounts)[number]
  ) => {
    try {
      await navigator.clipboard.writeText(
        `Email: ${account.email}\nPassword: ${account.password}`
      );

      setCopied(account.role);

      setTimeout(() => {
        setCopied('');
      }, 2000);
    } catch (error) {
      console.error('Failed to copy credentials:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-muted/30 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-4">
            <Home className="h-10 w-10 text-primary" />
          </div>
          <CardTitle className="text-2xl text-center">
            Society Portal
          </CardTitle>
          <CardTitle className="text-lg text-center">
            Welcome Back
          </CardTitle>
          <CardDescription className="text-center">
            Sign in to manage your society payments
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="login" className="w-full">
            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login-email">
                    Email
                  </Label>
                  <Input
                    id="login-email"
                    type="email"
                    placeholder="Name@society.com"
                    value={loginData.email}
                    onChange={(e) =>
                      setLoginData({
                        ...loginData,
                        email: e.target.value,
                      })
                    }
                    required
                    disabled={isLoading}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="login-password">
                    Password
                  </Label>
                  <Input
                    id="login-password"
                    type="password"
                    placeholder="••••••••"
                    value={loginData.password}
                    onChange={(e) =>
                      setLoginData({
                        ...loginData,
                        password: e.target.value,
                      })
                    }
                    required
                    disabled={isLoading}
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Logging in...
                    </>
                  ) : (
                    'Login'
                  )}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="register">
              <form onSubmit={handleRegister} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="register-name">
                    Full Name
                  </Label>
                  <Input
                    id="register-name"
                    type="text"
                    placeholder="John Doe"
                    value={registerData.name}
                    onChange={(e) =>
                      setRegisterData({
                        ...registerData,
                        name: e.target.value,
                      })
                    }
                    required
                    disabled={isLoading}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="register-email">
                    Email
                  </Label>
                  <Input
                    id="register-email"
                    type="email"
                    placeholder="john@example.com"
                    value={registerData.email}
                    onChange={(e) =>
                      setRegisterData({
                        ...registerData,
                        email: e.target.value,
                      })
                    }
                    required
                    disabled={isLoading}
                  />
                </div>
                <div className="space-y-2">

                  <Label htmlFor="register-password">
                    Password
                  </Label>

                  <Input
                    id="register-password"
                    type="password"
                    placeholder="••••••••"
                    value={registerData.password}
                    onChange={(e) =>
                      setRegisterData({
                        ...registerData,
                        password: e.target.value,
                      })
                    }
                    required
                    disabled={isLoading}
                  />
                </div>
                <div className="space-y-2">

                  <Label htmlFor="register-confirm">
                    Confirm Password
                  </Label>

                  <Input
                    id="register-confirm"
                    type="password"
                    placeholder="••••••••"
                    value={registerData.confirmPassword}
                    onChange={(e) =>
                      setRegisterData({
                        ...registerData,
                        confirmPassword: e.target.value,
                      })
                    }
                    required
                    disabled={isLoading}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating account...
                    </>
                  ) : (
                    'Create Account'
                  )}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      {/* Floating Demo Access Button */}
      <div className="fixed bottom-6 right-6 z-50">

        {showDemo && (
          <Card className="absolute bottom-16 right-0 w-[min(320px,calc(100vw-2rem))] shadow-2xl border animate-in fade-in slide-in-from-bottom-2 duration-200">

            <CardHeader className="pb-3">

              <div className="flex items-center justify-between">

                <CardTitle className="text-lg">
                  Demo Credentials
                </CardTitle>

                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setShowDemo(false)}
                  aria-label="Close demo credentials"
                >
                  <X size={16} />
                </Button>

              </div>

              <CardDescription>
                Explore Society Portal using these demo accounts.
              </CardDescription>

            </CardHeader>

            <CardContent className="space-y-4">

              {demoAccounts.map((account) => (

                <div
                  key={account.role}
                  className="rounded-lg border p-3 space-y-3"
                >

                  <p className="font-semibold text-sm">
                    {account.role}
                  </p>

                  <div className="space-y-2 text-xs break-all">

                    <div>
                      <p className="text-muted-foreground mb-1">
                        Email
                      </p>
                      <p className="font-medium">
                        {account.email}
                      </p>
                    </div>

                    <div>
                      <p className="text-muted-foreground mb-1">
                        Password
                      </p>
                      <p className="font-medium">
                        {account.password}
                      </p>
                    </div>

                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full gap-2"
                    onClick={() => copyCredentials(account)}
                  >
                    {copied === account.role ? (
                      <>
                        <Check size={14} />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy size={14} />
                        Copy Credentials
                      </>
                    )}
                  </Button>

                </div>

              ))}

              <p className="text-xs text-muted-foreground text-center">
                Demo accounts are provided for evaluation purposes.
              </p>

            </CardContent>

          </Card>
        )}

        <Button
          onClick={() => setShowDemo(!showDemo)}
          className="rounded-full shadow-xl gap-2 px-5"
          aria-expanded={showDemo}
        >
          {showDemo ? (
            <>
              <X size={18} />
              Close Demo
            </>
          ) : (
            <>
              <Eye size={18} />
              Demo Access
            </>
          )}
        </Button>

      </div>

    </div>
  );
};

export default Auth;
