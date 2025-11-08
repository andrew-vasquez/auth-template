import { requireAuth } from "@/lib/auth";
import { signOut } from "@/lib/actions/auth-actions";
import { redirect } from "next/navigation";

const Dashboard = async () => {
  const session = await requireAuth(); // This will redirect if not authenticated
  const handleSignOut = async () => {
    "use server";
    await signOut();
    redirect("/");
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-base-content">
              Clinic Dashboard
            </h1>
            <p className="text-base-content/70 mt-1">
              Welcome back, {session?.user?.name}
            </p>
          </div>
          <form action={handleSignOut}>
            <button type="submit" className="btn btn-primary btn-sm rounded-xl">
              Sign Out
            </button>
          </form>
        </div>

        {/* Dashboard Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Patients</h2>
              <p>Manage patient records and appointments</p>
              <div className="card-actions justify-end">
                <button className="btn btn-primary btn-sm rounded-xl">
                  View Patients
                </button>
              </div>
            </div>
          </div>

          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Appointments</h2>
              <p>Schedule and manage appointments</p>
              <div className="card-actions justify-end">
                <button className="btn btn-primary btn-sm rounded-xl">
                  View Schedule
                </button>
              </div>
            </div>
          </div>

          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Reports</h2>
              <p>Generate clinic reports and analytics</p>
              <div className="card-actions justify-end">
                <button className="btn btn-primary btn-sm rounded-xl">
                  View Reports
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* User Info Section */}
        <div className="mt-8">
          <div className="alert alert-info">
            <span>
              🎉 Authentication successful! You are logged in as{" "}
              {session?.user?.name}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
