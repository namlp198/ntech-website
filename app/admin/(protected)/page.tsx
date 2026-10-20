import { DataTable } from "@/components/ui/data-table";
import { EmptyState } from "@/components/ui/empty-state";
import { StatusBadge } from "@/components/ui/status-badge";

export default function AdminDashboardPage() {
  return (
    <div className="grid gap-8">
      <div>
        <p className="text-sm font-bold uppercase tracking-wider text-brand-700">Phase 0</p>
        <h1 className="mt-2 text-3xl font-bold">Nền tảng quản trị</h1>
        <p className="mt-3 text-muted">Chưa có dữ liệu kinh doanh thật. Các module nghiệp vụ sẽ được thêm theo roadmap.</p>
      </div>
      <DataTable
        headers={["Module", "Trạng thái"]}
        rows={[
          ["Authentication", <StatusBadge key="auth">Foundation</StatusBadge>],
          ["RBAC", <StatusBadge key="rbac">Server enforced</StatusBadge>],
          ["Catalog / Orders / Content", <StatusBadge key="planned">Planned</StatusBadge>],
        ]}
      />
      <EmptyState title="Không có KPI thật">
        Dashboard không hiển thị số liệu giả. Chỉ số sẽ xuất hiện sau khi có giao dịch và định nghĩa KPI đã duyệt.
      </EmptyState>
    </div>
  );
}

