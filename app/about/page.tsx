export const metadata = {
  title: 'About - Fund Flair',
  description: 'About page for Fund Flair',
}

export default function About() {
  return (
    <main className='p-10'>
      <h1 className='m-10 ml-0 font-extrabold text-2xl md:text-4xl lg:text-6xl'>
        Welcome to Fund Flair!
      </h1>

      <h2 className='m-4 ml-0 font-bold text-1xl md:text-2xl lg:text-4xl'>
        Why Us?
        <hr />
      </h2>
      <ul className='ml-4 list-disc'>
        <li>Easy-to-use Tools</li>
        <li>Fundraising Success</li>
        <li>Social Media Integration</li>
        <li>Flexible Pricing Options</li>
      </ul>

      <h2 className='m-4 ml-0 font-bold text-1xl md:text-2xl lg:text-4xl'>
        How Does Crowdfunding Work?
        <hr />
      </h2>
      <p>
        When you join our crowdfunding platform, you'll need to create a profile
        and set up your campaign. In your campaign, you'll share your story,
        explain why you're raising funds, and set a fundraising goal. Once your
        campaign is live, you can start promoting it to attract backers.
      </p>
      <br />
      <p>
        Depending on the type of crowdfunding site you choose, you may have a
        specific campaign duration, such as 30 days or longer. During this
        period, you can start collecting funds from your backers. The funds will
        be deposited directly into the financial institution account you link to
        your fundraising account upon registration.
      </p>

      <h2 className='m-4 ml-0 font-bold text-1xl md:text-2xl lg:text-4xl'>
        Our Commitment
      </h2>
      <p>
        We are committed to providing a reliable and secure crowdfunding
        platform for both fundraisers and backers. We prioritize the success and
        satisfaction of our users, and we strive to create a positive and
        supportive environment for crowdfunding campaigns.
      </p>
      <h3 className='m-4 ml-0 font-bold text-1xl lg:text-2xl'>
        Join us today and start turning your ideas into reality!
      </h3>
    </main>
  )
}
