import { PhoneCall, Wrench, Zap, Link as LinkIcon, ShieldCheck, HeartHandshake } from 'lucide-react';
import './Contacts.css';

const Contacts = () => {
  const contacts = [
    {
      category: 'Maintenance',
      icon: <Wrench size={24} color="var(--primary-blue)" />,
      people: [
        { name: 'NANCHU', phone: '9887878319' },
        { name: 'ASHOK', phone: '9785367972' }
      ]
    },
    {
      category: 'Electrician',
      icon: <Zap size={24} color="#eab308" />,
      people: [
        { name: 'MUKESH JI', phone: '9784681538' },
        { name: 'BHAGWAN JI', phone: '7735471783' },
        { name: 'MAGAN JI', phone: '7073730368' }
      ]
    },
    {
      category: 'Plumber',
      icon: <LinkIcon size={24} color="#3b82f6" />,
      people: [
        { name: 'MAHAVEER JI', phone: '9602258894' },
        { name: 'DINESH JI', phone: '8426841294' }
      ]
    },
    {
      category: 'Security',
      icon: <ShieldCheck size={24} color="#10b981" />,
      people: [
        { name: 'ROHITASH JI', phone: '9521770096' }
      ]
    },
    {
      category: 'Overall Assistance',
      icon: <HeartHandshake size={24} color="#ec4899" />,
      people: [
        { name: 'DR. B. S. YADAV', phone: '8947083888' }
      ]
    }
  ];

  return (
    <div className="contacts-page container">
      <div className="page-header" style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 className="heading-two-tone">Important <span className="highlight">Numbers</span></h1>
        <p className="subtitle">Quick access to essential campus contacts and assistance.</p>
      </div>

      <div className="contacts-grid">
        {contacts.map((group, idx) => (
          <div key={idx} className="contact-card card">
            <div className="contact-card-header">
              {group.icon}
              <h3>{group.category}</h3>
            </div>
            <div className="contact-card-body">
              {group.people.map((person, pIdx) => (
                <div key={pIdx} className="contact-person">
                  <span className="person-name">{person.name}</span>
                  <a href={`tel:${person.phone}`} className="person-phone">
                    <PhoneCall size={14} />
                    {person.phone}
                  </a>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Contacts;
