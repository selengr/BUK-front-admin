// next
import Head from 'next/head';
import { useState, useEffect } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import { Container, Grid, Stack, Button } from '@mui/material';
// auth
import { useAuthContext } from '../../auth/useAuthContext';
// layouts
import DashboardLayout from '../../layouts/dashboard';
// _mock_
import {
  _appFeatured,
  _appAuthors,
  _appInstalled,
  _appRelated,
  _appInvoices,
} from '../../_mock/arrays';
// components
import { useSettingsContext } from '../../components/settings';
// sections
import {
  AppWidget,
  AppWelcome,
  AppFeatured,
  AppNewInvoice,
  AppTopAuthors,
  AppTopRelated,
  AppAreaInstalled,
  AppWidgetSummary,
  AppCurrentDownload,
  AppTopInstalledCountries,
} from '../../sections/@dashboard/general/app';
// assets
import { SeoIllustration } from '../../assets/illustrations';

// ----------------------------------------------------------------------

GeneralAppPage.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

export default function GeneralAppPage() {
  const { user } = useAuthContext();

  const theme = useTheme();

  const { themeStretch } = useSettingsContext();

  const [countData,setCountData] = useState({});

  const [dataTable,setDataTable] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/dashboard/count-all")
    .then(response => {
      return response.json()
    })
    .then(data => {
      setCountData(data)
    })
  },[]); 

  useEffect(() => {
    fetch("http://localhost:8080/api/dashboard/order")
    .then(response => {
      return response.json()
    })
    .then(data => {
      debugger
      setDataTable(data)
    })
  },[]);

  return (
    <>
      <Head>
        <title> General: App | Minimal UI</title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Grid container spacing={3}>
          {/* <Grid item xs={12} md={8}>
            <AppWelcome
              title={`Welcome back! \n ${user?.displayName}`}
              description="If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything."
              img={
                <SeoIllustration
                  sx={{
                    p: 3,
                    width: 360,
                    margin: { xs: 'auto', md: 'inherit' },
                  }}
                />
              }
              action={<Button variant="contained">Go Now</Button>}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <AppFeatured list={_appFeatured} />
          </Grid> */}

          <Grid item xs={12} md={4}>
            <AppWidgetSummary
              title="تعداد کاربران"
              percent={2.6}
              total={countData.userCount}
              chart={{
                colors: [theme.palette.primary.main],
                series: [5, 18, 12, 51, 68, 11, 39, 37, 27, 20],
              }}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <AppWidgetSummary
              title="تعداد سفارشات"
              percent={0.2}
              total={countData.orderCount}
              chart={{
                colors: [theme.palette.info.main],
                series: [20, 41, 63, 33, 28, 35, 50, 46, 11, 26],
              }}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <AppWidgetSummary
              title="تعداد کالاهای فعال"
              percent={-0.1}
              total={countData.productCount}
              chart={{
                colors: [theme.palette.warning.main],
                series: [8, 9, 31, 8, 16, 37, 8, 33, 46, 31],
              }}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentDownload
              title="کل سفارشات"
              chart={{
                colors: [
                  theme.palette.primary.main,
                  theme.palette.info.main,
                  theme.palette.error.main,
                  theme.palette.warning.main,
                ],
                series: [
                  { label: 'در انتظار بررسی', value: 12244 },
                  { label: 'درحال پردازش', value: 53345 },
                  { label: 'تحویل شده', value: 44313 },
                  { label: 'لغو شده', value: 78343 },
                ],
              }}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppAreaInstalled
              title="تعداد سفارشات"
              subheader="(+43%) than last year"
              chart={{
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
                series: [
                  {
                    year: '1400',
                    data: [
                      { name: 'لغو شده', data: [10, 41, 35, 51, 49, 62, 69, 91, 148] },
                      { name: 'تحویل شده', data: [10, 34, 13, 56, 77, 88, 99, 77, 45] },
                    ],
                  },
                  {
                    year: '1401',
                    data: [
                      { name: 'لغو شده', data: [148, 91, 69, 62, 49, 51, 35, 41, 10] },
                      { name: 'تحویل شده', data: [45, 77, 99, 88, 77, 56, 13, 34, 10] },
                    ],
                  },
                ],
              }}
            />
          </Grid>

          <Grid item xs={12} lg={12}>
            <AppNewInvoice
              title="آخرین سفارشات"
              tableData={dataTable}
              tableLabels={[
                { id: 'id', label: 'شناسه سفارش' },
                { id: 'category', label: 'کاربر' },
                { id: 'price', label: 'مبلغ کل' },
                { id: 'status', label: 'وضعیت' },
                { id: '' },
              ]}
            />
          </Grid>

          {/* <Grid item xs={12} md={6} lg={4}>
            <AppTopRelated title="Top Related Applications" list={_appRelated} />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppTopInstalledCountries title="Top Installed Countries" list={_appInstalled} />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppTopAuthors title="Top Authors" list={_appAuthors} />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <Stack spacing={3}>
              <AppWidget
                title="Conversion"
                total={38566}
                icon="eva:person-fill"
                chart={{
                  series: 48,
                }}
              />

              <AppWidget
                title="Applications"
                total={55566}
                icon="eva:email-fill"
                color="info"
                chart={{
                  series: 75,
                }}
              />
            </Stack>
          </Grid> */}
        </Grid>
      </Container>
    </>
  );
}
