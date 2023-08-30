import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface InfoCardProps {
  title: string;
  value: number;
  info: string;
}
export function InfoCard(props: InfoCardProps) {
  return (
    <Card>
      <CardHeader className="py-0 space-y-0">
        <CardTitle className="text-sm font-medium">{props.title}</CardTitle>
      </CardHeader>
      <CardContent className="py-4">
        <div className="text-2xl font-bold">{props.value}</div>
        <p className="mt-0 text-xs text-muted-foreground">{props.info}</p>
      </CardContent>
    </Card>
  );
}
