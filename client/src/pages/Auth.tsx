import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { HeaderSection } from "@/pages/sections/HeaderSection";
import { FooterSection } from "@/pages/sections/FooterSection";

const authSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type AuthFormData = z.infer<typeof authSchema>;

export const Auth = (): JSX.Element => {
  const [isLogin, setIsLogin] = useState(true);
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [, setLocation] = useLocation();

  const form = useForm<AuthFormData>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const authMutation = useMutation({
    mutationFn: async (data: AuthFormData) => {
      const endpoint = isLogin ? "/api/auth/login" : "/api/auth/register";
      const response = await apiRequest("POST", endpoint, data);
      return await response.json();
    },
    onSuccess: (data) => {
      toast({
        title: isLogin ? "Login successful!" : "Registration successful!",
        description: `Welcome, ${data.user.username}!`,
      });
      form.reset();
      queryClient.invalidateQueries();
      
      // Redirect to dashboard after successful authentication
      setTimeout(() => {
        setLocation("/dashboard");
      }, 1000); // Small delay to show the success message
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Something went wrong",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: AuthFormData) => {
    authMutation.mutate(data);
  };

  return (
    <div className="w-full bg-white min-h-screen">
      <HeaderSection />
      <main className="container mx-auto px-8 py-12 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">
              {isLogin ? "Login" : "Register"}
            </CardTitle>
            <CardDescription>
              {isLogin 
                ? "Enter your credentials to access your account" 
                : "Create a new account to get started"
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your username" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input 
                          type="password" 
                          placeholder="Enter your password" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={authMutation.isPending}
                >
                  {authMutation.isPending 
                    ? (isLogin ? "Signing in..." : "Creating account...") 
                    : (isLogin ? "Sign In" : "Create Account")
                  }
                </Button>
              </form>
            </Form>
            
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                {isLogin ? "Don't have an account? " : "Already have an account? "}
                <button
                  type="button"
                  onClick={() => {
                    setIsLogin(!isLogin);
                    form.reset();
                  }}
                  className="text-blue-600 hover:text-blue-500 font-medium"
                >
                  {isLogin ? "Register here" : "Login here"}
                </button>
              </p>
            </div>
          </CardContent>
        </Card>
      </main>
      <FooterSection />
    </div>
  );
};