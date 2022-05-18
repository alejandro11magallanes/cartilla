import { Menu } from 'antd';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import img from '../imagenes/unknown.png'

function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  }
  
  const items = [
    getItem('', '',<img width={150}
    src={img}/>),
    getItem('Mascotas', 'sub1', <MailOutlined />, [
        getItem('Cartilla Vacunación', '1'),
        getItem('Mascotas', '2'),
        getItem('Vacunas', '3'),
        getItem('Fotos', '4')
    ]),
    getItem('Proveedores', 'sub2', <AppstoreOutlined />, [
      getItem('Veterinarias', '5'),
      getItem('Mascotas', '6'),
      getItem('Tiendas', '7'),
      getItem('Criptas', '8')
    ]),
    getItem('Favoritos', 'sub3', <SettingOutlined />, [
      getItem('Citas', '9'),
      getItem('Perfil', '10'),
    ]),
  ];
  
  const Siderd = () => {
    const onClick = (e) => {
      console.log('click ', e);
    };
  
    return (
        <div>
            <Menu
                onClick={onClick}
                style={{
                width: 200,
                }}
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1', 'sub2', 'sub3']}
                mode="inline"
                items={items}
            />
        </div>
    );
  };
  
  export default () => <Siderd />;