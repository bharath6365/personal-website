import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import StoryblokSection from '../components/StoryblokSection';
import { getStoryblokData } from '../utils/storyblok';

// Demo for development without Storyblok
const demoStoryblokData = {
  section_title: "Our Services",
  section_description: "We provide a range of services to help your business grow and thrive in the digital landscape.",
  items: [
    {
      component: "service_item",
      icon: {
        filename: "https://cdn-icons-png.flaticon.com/512/2210/2210153.png"
      },
      title: "Web Development",
      description: "Custom web development services tailored to your business needs using the latest technologies."
    },
    {
      component: "service_item",
      icon: {
        filename: "https://cdn-icons-png.flaticon.com/512/1968/1968666.png"
      },
      title: "Mobile Apps",
      description: "Native and cross-platform mobile application development with exceptional user experience."
    },
    {
      component: "service_item",
      icon: {
        filename: "https://cdn-icons-png.flaticon.com/512/1006/1006771.png"
      },
      title: "Digital Marketing",
      description: "Comprehensive digital marketing strategies to increase your online presence and drive growth."
    }
  ]
};

const Services = () => {
  const [servicesData, setServicesData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        // In production, replace with actual slug from Storyblok
        const data = await getStoryblokData('services');
        
        if (data) {
          setServicesData(data);
        } else {
          // Fallback to demo data if Storyblok fetch fails
          setServicesData(demoStoryblokData);
        }
      } catch (error) {
        console.error('Error fetching Storyblok data:', error);
        // Fallback to demo data
        setServicesData(demoStoryblokData);
      } finally {
        setLoading(false);
      }
    };
    
    // Comment this out for development without Storyblok
    // fetchData();
    
    // For development purposes, use demo data
    setServicesData(demoStoryblokData);
    setLoading(false);
    
  }, []);
  
  if (loading) {
    return <div>Loading...</div>;
  }
  
  return (
    <>
      <Head>
        <title>Our Services - Your Company Name</title>
        <meta name="description" content="Explore our services tailored to help your business grow" />
      </Head>
      
      <main>
        <StoryblokSection blok={servicesData} />
      </main>
    </>
  );
};

export default Services; 