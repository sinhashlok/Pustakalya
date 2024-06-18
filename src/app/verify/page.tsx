"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useState } from "react";
import axios, { AxiosError, AxiosResponse } from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

const FormSchema = z.object({
  pin: z.string().length(4, {
    message: "Your one-time password must be 4 characters.",
  }),
});

export default function InputOTPForm() {
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: "",
    },
  });
  const [btnDisabled, setBtnDisabled] = useState<boolean>(false);

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setBtnDisabled(true);

    await axios
      .post("/api/verify", JSON.stringify({ code: data.pin }), {
        headers: {
          Authorization: "Bearer " + (localStorage?.getItem("token") || ""),
        },
      })
      .then((res: AxiosResponse) => {
        toast.success("Code Verified");
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
    <div className="flex items-center justify-center w-screen h-screen px-5">
      <Toaster />
      <div className="border-2 p-10 rounded-lg">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-2/3 space-y-6"
          >
            <FormField
              control={form.control}
              name="pin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>One-Time Password</FormLabel>
                  <FormControl>
                    <InputOTP maxLength={4} {...field}>
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormDescription>
                    Please enter the one-time password sent to your phone.
                  </FormDescription>
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
              <Button type="submit">Submit</Button>
            )}
          </form>
        </Form>
      </div>
    </div>
  );
}
