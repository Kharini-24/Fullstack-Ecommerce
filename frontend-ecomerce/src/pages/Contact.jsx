import React from "react";
import Title from "../components/Title";
import NewsletterBox from "../components/NewsletterBox";
import { assets } from "../assets/assets";

const Contact = () => {
  return (
    <div className="border-t pt-14">

      {/* TITLE */}
      <div className="text-center text-2xl">
        <Title text1={"CONTACT"} text2={"US"} />
      </div>

      {/* CONTACT CONTENT */}
      <div className="my-10 flex flex-col md:flex-row gap-10 mb-28 justify-center">

        {/* IMAGE */}
        <img
          className="w-full md:max-w-[480px]"
          src={assets.contact_img}
          alt="Contact"
        />

        {/* TEXT */}
        <div className="flex flex-col justify-center items-start gap-6 text-gray-600">

          <p className="font-semibold text-xl text-gray-700">
            Our Store
          </p>

          <p className="text-gray-500">
            54709 Willms Station <br />
            Suite 350, Washington
          </p>

          <p className="text-gray-500">
            Tel: (415) 555-0132 <br />
            Email: admin@shopsmart.co
          </p>

          <p className="font-semibold text-xl text-gray-700">
            Careers at shopsmart
          </p>

          <p className="text-gray-500">
            Learn more about our teams and job openings.
          </p>

          <button className="border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition">
            Explore Jobs
          </button>
        </div>
      </div>

      {/* NEWSLETTER */}
      <NewsletterBox />

    </div>
  );
};

export default Contact;
