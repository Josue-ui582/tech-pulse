"use client";

import React from 'react';
import { motion } from "framer-motion";
import { Form, Input, Button, Card, Typography, Row, Col, message } from "antd";
import ContactInfo from '@/components/layout/contactInfo';
import ContactForm from '@/components/layout/contactForm';
import { Navbar } from '@/components/layout/navbar';

const { Title, Paragraph, Text } = Typography;

export default function ContactPage() {

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-16 px-6">
      <Navbar />
      <div className="max-w-6xl mx-auto">
        
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <Title className="font-black! text-4xl! md:text-6xl! text-slate-900! mb-4">
            Contactez <span className="text-blue-600">l'équipe</span>
          </Title>
          <Paragraph className="text-slate-500 text-lg max-w-2xl mx-auto">
            Une question, un signalement ou une proposition de collaboration ? 
            Nos administrateurs sont à votre écoute.
          </Paragraph>
        </motion.div>

        <Row gutter={[40, 40]}>
            <ContactInfo />
            <ContactForm />
        </Row>
      </div>

      <style jsx global>{`
        .ant-form-item-label label {
          font-weight: 700 !important;
          color: #475569 !important;
          font-size: 0.85rem !important;
          text-transform: uppercase;
          letter-spacing: 0.025em;
        }
        .ant-input:focus, .ant-input-focused {
          border-color: #2563eb !important;
          box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.1) !important;
        }
      `}</style>
    </div>
  );
}