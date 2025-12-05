import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { useUser, useAuth, SignedIn, SignedOut } from "@clerk/clerk-react";
import { submissionsApi } from "@/lib/api";
import { CheckCircle, XCircle, Clock, MapPin, Building, Calendar } from "lucide-react";
import type { Submission } from "@/lib/api";

export default function AdminSubmissions() {
  const navigate = useNavigate();
  const { user, isLoaded } = useUser();
  const { getToken } = useAuth();
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("all");

  useEffect(() => {
    const fetchSubmissions = async () => {
      if (!isLoaded) return;

      if (!user) {
        navigate("/auth");
        return;
      }

      try {
        const token = await getToken();
        if (!token) {
          toast.error("请先登录");
          navigate("/auth");
          return;
        }

        const status = filter === "all" ? undefined : filter;
        const data = await submissionsApi.getAll(status, token);
        setSubmissions(data || []);
      } catch (error: any) {
        console.error("Error fetching submissions:", error);
        toast.error(error.message || "获取提交列表失败");
      } finally {
        setLoading(false);
      }
    };

    fetchSubmissions();
  }, [navigate, user, isLoaded, filter, getToken]);

  const handleStatusUpdate = async (id: string, newStatus: "approved" | "rejected" | "pending") => {
    try {
      const token = await getToken();
      if (!token) {
        toast.error("请先登录");
        return;
      }

      await submissionsApi.updateStatus(id, newStatus, token);
      toast.success(`状态已更新为 ${newStatus === "approved" ? "已批准" : newStatus === "rejected" ? "已拒绝" : "待审核"}`);

      // Refresh submissions
      const status = filter === "all" ? undefined : filter;
      const data = await submissionsApi.getAll(status, token);
      setSubmissions(data || []);
    } catch (error: any) {
      console.error("Error updating status:", error);
      toast.error(error.message || "更新状态失败");
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return (
          <Badge className="bg-green-500 text-white">
            <CheckCircle className="w-3 h-3 mr-1" />
            已批准
          </Badge>
        );
      case "rejected":
        return (
          <Badge className="bg-red-500 text-white">
            <XCircle className="w-3 h-3 mr-1" />
            已拒绝
          </Badge>
        );
      default:
        return (
          <Badge className="bg-yellow-500 text-white">
            <Clock className="w-3 h-3 mr-1" />
            待审核
          </Badge>
        );
    }
  };

  if (!isLoaded || loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container py-8">加载中...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <SignedOut>
        <div className="container py-8">
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg mb-4">请先登录以查看提交</p>
            <Button onClick={() => navigate("/auth")}>登录</Button>
          </div>
        </div>
      </SignedOut>
      <SignedIn>
        <div className="container py-8">
          <div className="mb-6">
            <h1 className="text-4xl font-bold mb-2">学习空间提交管理</h1>
            <p className="text-muted-foreground">查看和管理用户提交的新学习空间</p>
          </div>

          <Tabs value={filter} onValueChange={setFilter} className="mb-6">
            <TabsList>
              <TabsTrigger value="all">全部 ({submissions.length})</TabsTrigger>
              <TabsTrigger value="pending">
                待审核 ({submissions.filter((s) => s.status === "pending").length})
              </TabsTrigger>
              <TabsTrigger value="approved">
                已批准 ({submissions.filter((s) => s.status === "approved").length})
              </TabsTrigger>
              <TabsTrigger value="rejected">
                已拒绝 ({submissions.filter((s) => s.status === "rejected").length})
              </TabsTrigger>
            </TabsList>
          </Tabs>

          {submissions.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground text-lg">暂无提交</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {submissions.map((submission) => (
                <Card key={submission.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <CardTitle className="text-2xl">{submission.name}</CardTitle>
                          {getStatusBadge(submission.status)}
                        </div>
                        <CardDescription className="flex items-center gap-4 mt-2">
                          <span className="flex items-center gap-1">
                            <Building className="w-4 h-4" />
                            {submission.building}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {submission.campus === "central" ? "中央校区" : submission.campus === "north" ? "北校区" : "医学校区"}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {new Date(submission.created_at).toLocaleDateString("zh-CN")}
                          </span>
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {submission.description && (
                      <div>
                        <h4 className="font-semibold mb-1">描述</h4>
                        <p className="text-muted-foreground">{submission.description}</p>
                      </div>
                    )}

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {submission.noise_level && (
                        <div>
                          <h4 className="font-semibold text-sm mb-1">噪音水平</h4>
                          <p className="text-sm text-muted-foreground capitalize">{submission.noise_level}</p>
                        </div>
                      )}
                      {submission.privacy_level && (
                        <div>
                          <h4 className="font-semibold text-sm mb-1">隐私级别</h4>
                          <p className="text-sm text-muted-foreground capitalize">{submission.privacy_level}</p>
                        </div>
                      )}
                      {submission.amenities && submission.amenities.length > 0 && (
                        <div className="md:col-span-2">
                          <h4 className="font-semibold text-sm mb-1">设施</h4>
                          <div className="flex flex-wrap gap-1">
                            {submission.amenities.map((amenity, idx) => (
                              <Badge key={idx} variant="secondary" className="text-xs">
                                {amenity}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {submission.submitter_name && (
                      <div className="text-sm text-muted-foreground">
                        提交者: {submission.submitter_name}
                        {submission.submitter_email && ` (${submission.submitter_email})`}
                      </div>
                    )}

                    {submission.status === "pending" && (
                      <div className="flex gap-2 pt-4 border-t">
                        <Button
                          onClick={() => handleStatusUpdate(submission.id, "approved")}
                          className="bg-green-500 hover:bg-green-600"
                        >
                          <CheckCircle className="w-4 h-4 mr-2" />
                          批准
                        </Button>
                        <Button
                          onClick={() => handleStatusUpdate(submission.id, "rejected")}
                          variant="destructive"
                        >
                          <XCircle className="w-4 h-4 mr-2" />
                          拒绝
                        </Button>
                      </div>
                    )}

                    {submission.status !== "pending" && (
                      <div className="pt-4 border-t">
                        <Button
                          onClick={() => handleStatusUpdate(submission.id, "pending")}
                          variant="outline"
                          size="sm"
                        >
                          重置为待审核
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </SignedIn>

      <Footer />
    </div>
  );
}

