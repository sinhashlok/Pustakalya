"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios, { AxiosResponse, AxiosError } from "axios";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signupSchema } from "@/schema/signupSchema";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { loginSchema } from "@/schema/loginSchema";

export default function Login() {
  const FormSchema = loginSchema;
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const [btnDisabled, setBtnDisabled] = useState<boolean>(false);

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setBtnDisabled(true);
    const res = await axios
      .post("/api/login", data)
      .then((res: AxiosResponse) => {
        toast.success(res.data.message, {
          duration: 6000,
        });
        router.push("/login");
      })
      .catch((err: AxiosError) => {
        console.log(err);
        const data: any = err?.response?.data;
        toast.error(data?.message), { duration: 6000 };
      });
    setBtnDisabled(false);
  }

  return (
    <div className="flex items-center justify-center w-screen h-screen">
      <Toaster />
      <div className="border-2 lg:w-[30%] rounded-lg p-6 px-12">
        <h1 className="text-2xl mb-6 text-center">Log in</h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-[100%] space-y-6"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter email address" {...field} />
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
                    <Input placeholder="Enter password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {btnDisabled ? (
              <Button disabled className="w-full">
                <Loader2 className="mr-2 h-4 w- animate-spin" />
                Please wait
              </Button>
            ) : (
              <Button type="submit" variant="outline" className="w-full">
                Submit
              </Button>
            )}
          </form>
          <div className="mt-6 text-center">
            <p>
              Don{`'`}t have an account?{" "}
              <Link href="/signup" className="hover:underline">
                Sign Up
              </Link>
            </p>
          </div>
        </Form>
      </div>
    </div>
  );
}
