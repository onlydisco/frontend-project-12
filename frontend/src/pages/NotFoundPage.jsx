import React from 'react';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import routes from '../routes';

const NotFoundPage = () => {
  const { t } = useTranslation();

  return (
    <Container className="text-center">
      <h1 className="h4 text-muted">{t('notFoundPage.header')}</h1>
      <p className="text-muted">
        {t('notFoundPage.description')}
        <Link to={routes.chatPagePath()}>{t('notFoundPage.link')}</Link>
      </p>
    </Container>
  );
};

export default NotFoundPage;
