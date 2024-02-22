import unittest
import ip_reputation
import json


class test_ip(unittest.TestCase):

    def test_invalid_ip(self):
        self.assertEqual(ip_reputation.check_ip_reputation("1.1.1"), "Enter a valid IP address.")
        self.assertEqual(ip_reputation.check_ip_reputation("https://google.com"), "Enter a valid IP address.")
        self.assertEqual(ip_reputation.check_ip_reputation(" "), "Enter a valid IP address.")

    def test_regex(self):
        self.assertFalse(ip_reputation.ip_is_valid("1.1.1"))
        self.assertFalse(ip_reputation.ip_is_valid("   "))
        self.assertFalse(ip_reputation.ip_is_valid(""))          
        self.assertFalse(ip_reputation.ip_is_valid("https://cloudflare.com"))     
        self.assertTrue(ip_reputation.ip_is_valid("1.1.1.1"))     
        self.assertTrue(ip_reputation.ip_is_valid("8.8.8.8"))     

    def test_valid_ip_id(self):
        self.assertEqual(json.loads(ip_reputation.check_ip_reputation("8.8.8.8"))['id'], "8.8.8.8")
        self.assertEqual(json.loads(ip_reputation.check_ip_reputation("192.168.1.1"))['id'], "192.168.1.1")
        self.assertEqual(json.loads(ip_reputation.check_ip_reputation("1.1.1.1"))['id'], "1.1.1.1")
        self.assertEqual(json.loads(ip_reputation.check_ip_reputation("54.239.28.85"))['id'], "54.239.28.85")
        self.assertEqual(json.loads(ip_reputation.check_ip_reputation("216.239.32.21"))['id'], "216.239.32.21")

    def test_ip_owner(self):
        self.assertEqual(json.loads(ip_reputation.check_ip_reputation("8.8.8.8"))['attributes']['as_owner'], "GOOGLE")
        self.assertEqual(json.loads(ip_reputation.check_ip_reputation("1.1.1.1"))['attributes']['as_owner'], "CLOUDFLARENET") 
        self.assertEqual(json.loads(ip_reputation.check_ip_reputation("54.239.28.85"))['attributes']['as_owner'], "AMAZON-02")
        self.assertEqual(json.loads(ip_reputation.check_ip_reputation("23.185.0.253"))['attributes']['as_owner'], "FASTLY")
        self.assertEqual(json.loads(ip_reputation.check_ip_reputation("143.166.135.105"))['attributes']['as_owner'], "DELL-BLK")
    
    def test_reputation(self):
        self.assertEqual(json.loads(ip_reputation.check_ip_reputation("8.8.8.8"))['attributes']['reputation'], 575)
        self.assertEqual(json.loads(ip_reputation.check_ip_reputation("8.8.4.4"))['attributes']['reputation'], 182)
        self.assertEqual(json.loads(ip_reputation.check_ip_reputation("1.1.1.1"))['attributes']['reputation'], 99)
        self.assertEqual(json.loads(ip_reputation.check_ip_reputation("1.0.0.1"))['attributes']['reputation'], 122)
        self.assertEqual(json.loads(ip_reputation.check_ip_reputation("9.9.9.9"))['attributes']['reputation'], 10)
        self.assertEqual(json.loads(ip_reputation.check_ip_reputation("54.239.28.85"))['attributes']['reputation'], 0)
        self.assertEqual(json.loads(ip_reputation.check_ip_reputation("23.185.0.253"))['attributes']['reputation'], -1)
        self.assertEqual(json.loads(ip_reputation.check_ip_reputation("143.166.135.105"))['attributes']['reputation'], 0)


if __name__ == '__main__':
    unittest.main()