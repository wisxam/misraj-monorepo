import {
  Typography,
  Card,
  CardContent,
  Divider,
  Container,
} from '@mui/material';

const Homepage = () => {
  return (
    <Container
      maxWidth="md"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 4,
        padding: 4,
      }}
    >
      <Card sx={{ width: '100%', boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h6" fontWeight="bold" color="text.primary">
            Key Features
          </Typography>
          <Divider sx={{ my: 2 }} />
          <Typography variant="body1" color="text.secondary">
            - Authentication and authorization using JWT.
            <br />
            - State management with zustand.
            <br />
            - Mui as the user interface library.
            <br />
            - Backend using NestJS with Prisma and PostgreSQL.
            <br />
            - Zod and useForm react-hook for forms
            <br />- React-query for server state, caching, pagination and
            invalidating
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Homepage;
