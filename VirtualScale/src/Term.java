import java.awt.Color;
import java.awt.Font;
import java.awt.Point;
import java.awt.event.MouseEvent;
import java.awt.event.MouseListener;
import java.awt.geom.Ellipse2D;

import javax.swing.JComponent;
import javax.swing.JOptionPane;
import javax.swing.JTextField;

abstract class Term extends JComponent implements MouseListener {

	int weight, rotateDir;
	Ellipse2D circle;
	JTextField edit;
	Point flatLoc, highLoc, lowLoc;
	public static final int W = 50;
	RemoveTermListener removeTermListener;

	public Term(RemoveTermListener removeTermListener) {
		this.removeTermListener = removeTermListener;
		setLayout(null);
		setOpaque(false);
		edit = new JTextField();
		edit.setForeground(Color.black);
		edit.setOpaque(false);
		edit.setBorder(null);
		edit.setDocument(new LengthRestrictedDocument(2));
		edit.setHorizontalAlignment(JTextField.CENTER);
		edit.setFont(new Font("SansSerif", Font.BOLD, 15));
		edit.setSize(W, W);
		edit.setVisible(true);
		edit.addMouseListener(this);

		circle = new Ellipse2D.Double();
		circle.setFrame(0, 0, W, W);

		add(edit);
	}

	public Term(RemoveTermListener removeTermListener, int x, int y) {
		this(removeTermListener);
		setLocation(x, y);

		flatLoc = new Point(x, y);
		highLoc = rotate(25);
		lowLoc = rotate(-25);
	}

	private Point rotate(int angle) {

		double theta = Math.toRadians(angle);
		double px = getLocation().x + circle.getCenterX();
		double py = getLocation().y + circle.getCenterY();
		int ox = ScalePanel.center.x;
		int oy = ScalePanel.center.y;

		int newX = (int) (Math.cos(theta) * (px - ox) - Math.sin(theta)
				* (py - oy) + ox);
		int newY = (int) (Math.sin(theta) * (px - ox) + Math.cos(theta)
				* (py - oy) + oy);

		return new Point(newX - W / 2, newY - W / 2);
	}

	public void tiltUp() {
		setLocation(highLoc);
	}

	public void tiltDown() {
		setLocation(lowLoc);
	}

	public void layFlat() {
		setLocation(flatLoc);
	}

	public int updateWeight() {
		try {
			String val = edit.getText().toString();
			weight = Integer.parseInt(val);
		} catch (NumberFormatException nfe) {
			JOptionPane.showMessageDialog(this, "Fix your input!");
		}
		return weight;
	}

	public abstract Term cloneMe(int x, int y);

	@Override
	public void mouseClicked(MouseEvent me) {
		if (me.getClickCount() == 2) {
			removeTermListener.removeTerm(this);
		} else if (me.getClickCount() == 1) {
			weight *= -1;
			if (edit.getText().charAt(0) == '-') {
				edit.setText(edit.getText().substring(1));
			} else {
				edit.setText("-" + edit.getText());
			}
			repaint();
		}
	}

	@Override
	public void mouseEntered(MouseEvent me) {
	}

	@Override
	public void mouseExited(MouseEvent me) {
	}

	@Override
	public void mousePressed(MouseEvent me) {
	}

	@Override
	public void mouseReleased(MouseEvent me) {
	}
}