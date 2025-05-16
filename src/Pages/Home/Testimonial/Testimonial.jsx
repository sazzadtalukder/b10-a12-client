import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';

const testimonials = [
  {
    name: "Jane Doe",
    photo: "https://i.ibb.co/8FGPYP7/IMG-20230518-WA0029.jpg",
    quote: "This platform helped me grow my career like never before.",
  },
  {
    name: "John Smith",
    photo: "https://i.ibb.co/8FGPYP7/IMG-20230518-WA0029.jpg",
    quote: "Amazing experience! The support team was incredibly helpful.",
  },
  {
    name: "Emily Johnson",
    photo: "https://i.ibb.co/8FGPYP7/IMG-20230518-WA0029.jpg",
    quote: "I found exactly what I was looking for. Highly recommend it!",
  },
];

const  Testimonial=()=> {
  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8">What Our Users Say</h2>
        <Swiper
          modules={[Pagination]}
          spaceBetween={30}
          slidesPerView={1}
          pagination={{ clickable: true }}
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={index}>
              <div className="bg-white p-6 rounded-2xl shadow-md flex flex-col items-center text-center">
                <img
                  src={testimonial.photo}
                  alt={testimonial.name}
                  className="w-20 h-20 rounded-full mb-4"
                />
                <p className="text-gray-600 italic">"{testimonial.quote}"</p>
                <h3 className="mt-4 font-semibold text-lg">{testimonial.name}</h3>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
export default Testimonial