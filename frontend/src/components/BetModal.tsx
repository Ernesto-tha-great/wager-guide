"use client";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { XIcon } from "lucide-react";

interface BetModalProps {
  children: React.ReactNode;
  onPlaceBet: (betId: number, betForExceed: boolean, amount: string) => void;
  betId: number;
}
const PlaceBetModal = ({ children, onPlaceBet, betId }: BetModalProps) => {
  const formSchema = z.object({
    amount: z.string(),
    betForExceed: z.boolean(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: "",
      betForExceed: false,
    },
  });

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    console.log(data, betId);
    try {
      onPlaceBet(betId, data.betForExceed, data.amount);
    } catch (err: any) {
      toast.error("Transaction Failed: " + err.message);
      console.log("Transaction Failed: " + err.message);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-semibold">Make a bet</h1>
              <AlertDialogCancel className="border-none">
                <XIcon size={30} />
              </AlertDialogCancel>
            </div>
          </AlertDialogTitle>
        </AlertDialogHeader>
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-8 mt-3"
            >
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="">
                      <h1 className="text-[#32393A]">Amount</h1>
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="rounded-lg border-none bg-[#14A800]/10 focus:outline-none"
                        placeholder="Bet amount (ETH)"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="betForExceed"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      <h1 className="text-[#32393A]">Bet</h1>
                    </FormLabel>
                    <Select
                      onValueChange={(value) =>
                        field.onChange(value === "true")
                      }
                    >
                      <FormControl>
                        <SelectTrigger className="border-none bg-[#14A800]/10 focus:outline-none">
                          <SelectValue placeholder="will exceed" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="true">true</SelectItem>
                        <SelectItem value="false">false</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex items-center justify-center gap-6">
                <Button
                  className="bg-[#14A800]/10 w-fit my-8 text-black rounded-full"
                  size="lg"
                  type="submit"
                >
                  Cancel
                </Button>

                <Button
                  className="bg-[#14A800] w-fit my-8 rounded-full"
                  size="lg"
                  type="submit"
                >
                  Submit
                </Button>
              </div>
            </form>
          </Form>
        </div>
        <AlertDialogFooter className="mt-4"></AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default PlaceBetModal;
