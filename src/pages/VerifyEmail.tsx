import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MailCheckIcon, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { PageTransition } from "@/lib/animations";
import { supabase } from "@/lib/supabase";

const VerifyEmailPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Ambil email dari state navigasi atau localStorage
  useEffect(() => {
    const storedEmail = localStorage.getItem("temp_email");
    if (location.state?.email) {
      setEmail(location.state.email);
      localStorage.setItem("temp_email", location.state.email);
    } else if (storedEmail) {
      setEmail(storedEmail);
    } else {
      navigate("/register");
    }
  }, [location, navigate]);

  const handleResendEmail = async () => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: email,
      });

      if (error) throw error;

      toast({
        title: "Email terkirim ulang!",
        description: "Cek kembali inbox email Anda untuk tautan verifikasi",
      });
    } catch (error) {
      toast({
        title: "Gagal mengirim ulang",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-botnexa-50/50 to-background dark:from-botnexa-900/10 dark:to-background">
        <header className="py-4 px-6">
          <Link
            to="/register"
            className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to register
          </Link>
        </header>

        <main className="flex-1 flex items-center justify-center p-4">
          <div className="w-full max-w-md mx-auto">
            <Card className="p-6 bg-white/70 dark:bg-card/50 backdrop-blur-sm border-border/50 animate-scale-in">
              <div className="text-center space-y-6">
                <div className="inline-block bg-botnexa-100 dark:bg-botnexa-800/20 p-4 rounded-full">
                  <MailCheckIcon className="h-12 w-12 text-botnexa-600 dark:text-botnexa-400" />
                </div>

                <h2 className="text-2xl font-bold">Verifikasi Email Anda</h2>

                <p className="text-muted-foreground">
                  Kami telah mengirim tautan verifikasi ke
                  <span className="block font-semibold text-foreground mt-1">{email}</span>
                </p>

                <p className="text-sm text-muted-foreground">
                  Buka inbox email Anda dan klik tautan verifikasi untuk mengaktifkan akun
                </p>

                <div className="space-y-4">
                  <Button
                    onClick={handleResendEmail}
                    className="w-full"
                    disabled={isLoading}
                  >
                    {isLoading ? "Mengirim..." : "Kirim Ulang Email Verifikasi"}
                  </Button>
                </div>

                <div className="text-sm text-muted-foreground">
                  <p>Tidak menerima email?</p>
                  <ul className="list-disc list-inside mt-2 text-left">
                    <li>Cek folder spam atau junk</li>
                    <li>Pastikan email benar: {email}</li>
                    <li>Hubungi dukungan pelanggan</li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>
        </main>
      </div>
    </PageTransition>
  );
};

export default VerifyEmailPage;