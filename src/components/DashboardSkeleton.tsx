import { Card, Grid, Skeleton } from "@luxis-ui/react";

export default function DashboardSkeleton() {
  return (
    <section className="dashboard-page">
      <Grid container spacing={2}>
        {[1, 2, 3, 4].map((i) => (
          <Grid item xs={12} sm={6} md={3} key={i}>
            <Skeleton variant="rectangular" height={120} animation="wave" />
          </Grid>
        ))}
      </Grid>
      <Grid container spacing={2} className="mt-4">
        <Grid item xs={12} md={8}>
          <Card
            variant="outlined"
            header={<Skeleton variant="text" width="40%" height={32} animation="wave" />}
            divider
            className="dashboard-page__panel dashboard-page__panel--wide"
          >
            <div className="dashboard-page__panel-body dashboard-page__chart-placeholder">
              <Skeleton variant="rectangular" height={260} animation="wave" />
            </div>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card
            variant="outlined"
            header={<Skeleton variant="text" width="40%" height={32} animation="wave" />}
            divider
            className="dashboard-page__panel"
          >
            <div className="dashboard-page__panel-body dashboard-page__chart-placeholder">
              <Skeleton variant="rectangular" height={260} animation="wave" />
            </div>
          </Card>
        </Grid>
      </Grid>
    </section>
  );
}
