// next
import Head from 'next/head';
// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// layouts
import DashboardLayout from '../../../../layouts/dashboard';
// components
import { useSettingsContext } from '../../../../components/settings';
import CustomBreadcrumbs from '../../../../components/custom-breadcrumbs';
// sections
import ProductNewEditForm from '../../../../sections/@dashboard/e-commerce/ProductNewEditForm';

// ----------------------------------------------------------------------

EcommerceProductCreatePage.getLayout = (page: React.ReactElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);

// ----------------------------------------------------------------------

export default function EcommerceProductCreatePage() {
  const { themeStretch } = useSettingsContext();

  return (
    <>
      <Head>
        <title> ثبت کالای جدید</title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading=""
          links={[
            { name: 'داشلورد', href: PATH_DASHBOARD.root },
            {
              name: 'کالا',
              href: PATH_DASHBOARD.eCommerce.root,
            },
            { name: 'کالای جدید' },
          ]}
        />
        <ProductNewEditForm />
      </Container>
    </>
  );
}
