import { redirect } from "next/navigation";
import { WORKERS } from "../../../lib/data";

export default function ChatsIndexPage() {
  redirect(`/chats/${WORKERS[0].id}`);
}
