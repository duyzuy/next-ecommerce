import SEO from '../components/common/Seo';
import Breadcrumb from '../components/BreadCrumb';
const withlayout = (Component, { title, meta = {}, breadcrumbs = [] } = {}) => {
  return (props) => (
    <div className="layout has-sidebar">
      <SEO title="Bep tu nhap khau" description="bep tu nhap khau chinh hang" />
      <Breadcrumb items={breadcrumbs} />
      <div class="layout-container">
        <Component {...props}>{props.children}</Component>
      </div>
    </div>
  );
};

export { withlayout };
