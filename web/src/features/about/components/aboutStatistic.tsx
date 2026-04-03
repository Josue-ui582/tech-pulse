import { Col, Row, Statistic } from "antd";

export default function AboutStatistic() {
    return (
        <section className="bg-indigo-600 py-20 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <Row gutter={[32, 32]} justify="center">
            <Col xs={12} md={6}>
              <Statistic 
                value={150} 
                suffix="K" 
                title={<span className="text-indigo-100">Lecteurs mensuels</span>} 
                valueStyle={{ color: 'white', fontWeight: 900, fontSize: '2.5rem' }} 
              />
            </Col>
            <Col xs={12} md={6}>
              <Statistic 
                value={12} 
                suffix="M" 
                title={<span className="text-indigo-100">Articles partagés</span>} 
                valueStyle={{ color: 'white', fontWeight: 900, fontSize: '2.5rem' }} 
              />
            </Col>
            <Col xs={12} md={6}>
              <Statistic 
                value={50} 
                suffix="+" 
                title={<span className="text-indigo-100">Journalistes</span>} 
                valueStyle={{ color: 'white', fontWeight: 900, fontSize: '2.5rem' }} 
              />
            </Col>
          </Row>
        </div>
      </section>
    )
}