import FeaturedDestinations from '../sections/FeaturedDestinations/FeaturedDestinations.jsx'
import Gallery from '../sections/Gallery/Gallery.jsx'
import Hero from '../sections/Hero/Hero.jsx'
import Journal from '../sections/Journal/Journal.jsx'
import ResponsibleTravel from '../sections/ResponsibleTravel/ResponsibleTravel.jsx'
import StoryCollage from '../sections/StoryCollage/StoryCollage.jsx'

/** Homepage sections in display order. Nav, CTA and footer come from the App shell. */
function Home() {
  return (
    <>
      <Hero />
      <FeaturedDestinations />
      <StoryCollage />
      <Journal />
      <Gallery />
      <ResponsibleTravel />
    </>
  )
}

export default Home
