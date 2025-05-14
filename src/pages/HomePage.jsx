import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <>
      <section className="intro">
        <h1>Kondyterska</h1>
      </section>

      <main>
        <section className="banner section-block">
          <h2>Авторські десерти з доставкою по Львову</h2>
          <p>Бенто-торти, святкові торти, еклери, тістечка – обери на свій смак</p>
          <Link to="/menu" className="btn">Переглянути пропозиції</Link>
        </section>

        <section className="about section-block">
          <h2>Про нас</h2>
          <p>Олена – професійна кондитерка, яка навчалася у провідній європейській школі кондитерського мистецтва. 
             Її десерти – це поєднання витонченого смаку, найкращих інгредієнтів і любові до справи.</p>
        </section>

        <section className="benefits section-block">
          <h2>Чому обирають нас?</h2>
          <div className="benefit-grid">
            <div className="benefit">
              <img src="images/fast-delivery.jpg" alt="Швидка доставка" />
              <h3>Швидка доставка</h3>
              <p>Ваш десерт прибуде до вас у найкоротші терміни!</p>
            </div>
            <div className="benefit">
              <img src="/images/custom-order.png" alt="Індивідуальні замовлення" />
              <h3>Індивідуальні замовлення</h3>
              <p>Обирайте начинку, розмір і стиль оформлення торта.</p>
            </div>
            <div className="benefit">
              <img src="images/discount.png" alt="Акції та бонуси" />
              <h3>Знижки та промокоди</h3>
              <p>Отримуйте бонуси та персональні знижки при замовленні.</p>
            </div>
          </div>
        </section>

        <section className="how-to-order section-block">
          <h2>Як замовити?</h2>
          <ol>
            <li>Перегляньте <Link to="/menu">меню</Link> і оберіть десерт.</li>
            <li>Налаштуйте його під себе: начинку, розмір, декор.</li>
            <li>Додайте в <Link to="/cart">кошик</Link> і оформіть замовлення.</li>
            <li>Очікуйте доставку або самовивіз.</li>
          </ol>
        </section>

        <section className="offers section-block">
          <h2>Спеціальні пропозиції</h2>
          <p>Перше замовлення – знижка 10%! Код: <strong className="bold">SWEET10</strong></p>
          <p>Безкоштовна доставка при замовленні від 650 грн!</p>
        </section>
      </main>
    </>
  );
};

export default HomePage;
