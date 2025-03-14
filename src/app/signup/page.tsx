import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function SignupPage() {
  return (
    <div className="container-padded py-12">
      <div className="max-w-md mx-auto">
        <Card className="border-2 border-primary/20">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Get Early Access</CardTitle>
            <CardDescription>
              Be among the first to experience ScamSafe when we launch.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <Input 
                  id="name" 
                  type="text" 
                  placeholder="Your name" 
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email <span className="text-danger">*</span>
                </label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="you@example.com" 
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  What concerns you most about text scams?
                </label>
                <div className="space-y-2">
                  {['Identity theft', 'Financial fraud', 'Privacy concerns', 'Helping vulnerable family members', 'General security'].map((option) => (
                    <label key={option} className="flex items-center">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 text-primary focus:ring-primary h-4 w-4 mr-2"
                      />
                      <span className="text-sm">{option}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div className="pt-4">
                <Button type="submit" className="w-full">
                  Join Waitlist
                </Button>
              </div>
              
              <p className="text-xs text-gray-500 text-center pt-2">
                We respect your privacy and will never share your information with third parties.
              </p>
            </form>
          </CardContent>
        </Card>
        
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>
            ScamSafe is currently in development. By signing up, you&apos;ll be notified when we launch and may be invited to participate in beta testing.
          </p>
        </div>
      </div>
    </div>
  );
}