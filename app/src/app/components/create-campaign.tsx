import { FormEvent, use, useEffect } from "react";
import {
  type BaseError,
  useWriteContract,
  useWaitForTransactionReceipt,
  useAccount,
} from "wagmi";
import { parseAbi } from "viem";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import Link from "next/link";

export function CreateCampaign() {
  const { address } = useAccount();
  const { toast } = useToast();

  const { data: hash, error, isPending, writeContract } = useWriteContract();

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    writeContract({
      address: "0xfb979d86e10fd018803c8bd8d74c131d813893e1",
      abi: parseAbi([
        "function createHandOutCampaign(address _beneficiary, uint256 _goal, uint256 _duration, address _yieldStrategy)",
      ]),
      functionName: "createHandOutCampaign",
      args: [
        address as `0x${string}`,
        BigInt(10000) * BigInt(10) ** BigInt(18),
        BigInt(60 * 60 * 24 * 30),
        "0x6EB69807304823665642D285BA92a04e9c1194B8",
      ],
    });
  }

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  useEffect(() => {
    {
      isConfirming &&
        toast({
          title: "Waiting for confirmation...",
          action: (
            <ToastAction altText="Explorer" asChild>
              <Link
                target="_blank"
                href={`https://sepolia.lineascan.build/tx/${hash}`}
              >
                Explorer
              </Link>
            </ToastAction>
          ),
          className: "text-black",
        });
    }
    {
      isConfirmed &&
        toast({
          title: "Transaction confirmed.",
          action: (
            <ToastAction altText="Explorer" asChild>
              <Link
                target="_blank"
                href={`https://sepolia.lineascan.build/tx/${hash}`}
              >
                Explorer
              </Link>
            </ToastAction>
          ),
          className: "text-black",
        });
    }
    {
      error &&
        toast({
          title: "Error",
          description: (error as BaseError).shortMessage || error.message,
          variant: "destructive",
          className: "text-black",
        });
    }
  }, [isConfirming, isConfirmed, error]);

  return (
    <div className="container">
      <div className="stack">
        <form className="set" onSubmit={submit}>
          <Button
            disabled={isPending}
            type="submit"
            className="bg-[#F7D1D1] text-black font-bold hover:bg-[#F5B8B8] text-lg px-8 py-2 rounded-full"
          >
            {isPending ? "Confirming..." : "Start your campaign"}
          </Button>
        </form>
      </div>
    </div>
  );
}
