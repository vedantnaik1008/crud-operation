import Form from "@/components/Form";
import GetPost from "@/components/GetPost";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
    <Form />
    <GetPost />
    </main>
  );
}
