import RandomProfileImage from "@/assets/profile.jpeg";
import { auth } from "@/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const session = await auth();
  if (!session) redirect("/auth");

  const { user } = session;

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="mx-auto max-w-2xl">
        <CardHeader className="flex flex-col items-center gap-4 sm:flex-row">
          <Avatar className="h-24 w-24">
            <AvatarImage
              src={user.image ?? RandomProfileImage.src}
              alt={user.name ?? "user-image"}
            />
            <AvatarFallback>
              {(user.name ?? "")
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="text-center sm:text-left">
            <CardTitle className="text-2xl">{user.name}</CardTitle>
            <p className="text-muted-foreground">{user.email}</p>
            <Badge variant="secondary" className="mt-2">
              ID: {user.id}
            </Badge>
          </div>
        </CardHeader>
        <Separator />
        <CardContent className="mt-4 grid gap-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <h3 className="font-semibold">Role</h3>
              <p>Viewer</p>
            </div>
            <div>
              <h3 className="font-semibold">Location</h3>
              <p>Hoshiarpur, India</p>
            </div>
          </div>
          <div>
            <h3 className="font-semibold">Member Since</h3>
            <p>October, 2024</p>
          </div>
          <div>
            <h3 className="font-semibold">Bio</h3>
            <p className="text-muted-foreground">
              {user.name} is a regular viewer of this Property Listers website.
              Passionate about learning new things and sharing my experiences. I
              love exploring different cultures, trying new foods, and
              discovering hidden gems. As a lover of luxury real estate,
              I&apos;m always on the lookout for the next big thing in the
              property market. Let&apos;s connect!
            </p>
          </div>
        </CardContent>
        <Separator />
        <CardFooter className="mt-4 flex justify-between">
          <Button variant="outline">Edit Profile</Button>
          <Button>
            <Link href={`mailto:${user.email}`}>Contact</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
