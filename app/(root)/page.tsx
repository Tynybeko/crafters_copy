import Banner from "@/components/banner";
import PopularCards from "@/components/cards/PopularCards";
import { PopularData } from "@/fakeObj";
import Products from "@/components/products";

export default function Home() {
  return (
    <main>
      <Banner />
      <section className="popular">
        <div className="globalContainer">
          <div className="popular-title">
            <h2>Popular category</h2>
            <div className="popular-title-btns">
              <button>New</button>
              <button>Popular</button>
            </div>
          </div>
          <div className="popular-cards">
            {PopularData.map((item, index) =>
              <PopularCards key={index} data={item} />
            )}
          </div>
        </div>
      </section>
      <Products />
    </main>
  );
}
