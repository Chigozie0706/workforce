import { redirect } from "next/navigation";

// Worker id 1 is Marcus Johnson in the seed data — first contact by default.
export default function ChatsIndexPage() {
  redirect("/chats/1");
}
